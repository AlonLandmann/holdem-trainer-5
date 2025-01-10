import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
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