import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.cookies.holdemTrainerSessionId) {
        return res.status(401).json({ success: false, message: messages.noSessionDetected });
    }

    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                sessionCookie: req.cookies.holdemTrainerSessionId,
            },
            select: {
                role: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user || user.role !== "admin") {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    let trainingSessions;

    try {
        trainingSessions = await prisma.trainingSession.findMany({
            include: {
                user: true,
                trainingUnits: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true, trainingSessions });
};