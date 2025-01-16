import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.body.token) {
        return res.status(400).json({ success: false, message: messages.missingFormData });
    }

    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                verificationToken: req.body.token,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(400).json({ success: false, message: messages.userNotFound });
    }

    try {
        user = await prisma.user.update({
            where: {
                verificationToken: req.body.token,
            },
            data: {
                isVerified: true,
                verificationToken: null,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true });
};
