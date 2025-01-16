import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.cookies.holdemTrainerSessionId) {
        return res.status(401).json({ success: false, message: messages.noSessionDetected });
    }

    if (
        typeof req.body.rangeId !== "number" ||
        typeof req.body.rangeIndex !== "number" ||
        typeof req.body.originFolderId !== "number" ||
        typeof req.body.targetFolderId !== "number" ||
        typeof req.body.targetFolderLength !== "number"
    ) {
        return res.status(400).json({ success: false, message: messages.missingFormData });
    }

    if (req.body.targetFolderId === req.body.originFolderId) {
        return res.status(200).json({ success: true });
    }

    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                sessionCookie: req.cookies.holdemTrainerSessionId,
            },
            select: {
                id: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(401).json({ success: false, message: messages.userNotFound });
    }

    try {
        await prisma.$transaction([
            prisma.range.update({
                where: {
                    id: req.body.rangeId,
                    folder: {
                        is: {
                            userId: user.id,
                        },
                    },
                },
                data: {
                    index: req.body.targetFolderLength,
                    folderId: req.body.targetFolderId,
                },
            }),
            prisma.range.updateMany({
                where: {
                    folderId: req.body.originFolderId,
                    index: {
                        gt: req.body.rangeIndex,
                    },
                },
                data: {
                    index: {
                        decrement: 1,
                    },
                },
            }),
        ]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true });
};
