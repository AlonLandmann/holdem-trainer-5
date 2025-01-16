import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.query.userId) {
        return res.status(400).json({ success: false, message: messages.missingQueryData });
    }

    let settings;

    try {
        settings = await prisma.settings.findUnique({
            where: {
                userId: Number(req.query.userId),
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!settings) {
        return res.status(401).json({ success: false, message: "Settings not found." });
    }

    return res.status(200).json({ success: true, settings });
};