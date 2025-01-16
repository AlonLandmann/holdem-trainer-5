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
        typeof req.body.origin !== "number" ||
        typeof req.body.originId !== "number" ||
        typeof req.body.target !== "number"
    ) {
        return res.status(400).json({ success: false, message: messages.missingFormData });
    }

    if (req.body.target === req.body.origin || req.body.target === req.body.origin + 1) {
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
            prisma.folder.updateMany({
                where: {
                    userId: user.id,
                    index: {
                        gt: req.body.target > req.body.origin ? req.body.origin : req.body.target - 1,
                        lt: req.body.target > req.body.origin ? req.body.target : req.body.origin
                    },
                },
                data: {
                    index: req.body.target > req.body.origin ? { decrement: 1 } : { increment: 1 },
                },
            }),
            prisma.folder.update({
                where: {
                    id: req.body.originId
                },
                data: {
                    index: req.body.target > req.body.origin ? req.body.target - 1 : req.body.target,
                },
            }),
        ]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true });
};
