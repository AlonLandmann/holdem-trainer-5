import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.cookies.holdemTrainerSessionId) {
        return res.status(401).json({ success: false, message: messages.noSessionDetected });
    }

    if (
        !req.query.rangeId ||
        !req.query.rangeIndex ||
        !req.query.folderId
    ) {
        return res.status(400).json({ success: false, message: messages.missingQueryData });
    }

    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                sessionCookie: req.cookies.holdemTrainerSessionId,
            },
            select: {
                id: true,
                folders: {
                    select: {
                        ranges: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(401).json({ success: false, message: messages.userNotFound });
    }

    const allRangeIds = [];

    for (let i = 0; i < user.folders.length; i++) {
        for (let j = 0; j < user.folders[i].ranges.length; j++) {
            allRangeIds.push(user.folders[i].ranges[j].id);
        }
    }

    if (!allRangeIds.includes(Number(req.query.rangeId))) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        await prisma.$transaction([
            prisma.range.delete({
                where: {
                    id: Number(req.query.rangeId),
                    folder: {
                        is: {
                            userId: user.id,
                        },
                    },
                },
            }),
            prisma.range.updateMany({
                where: {
                    folderId: Number(req.query.folderId),
                    index: {
                        gt: Number(req.query.rangeIndex)
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
