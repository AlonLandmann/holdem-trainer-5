import prisma from "@/lib/prisma";
import messages from "@/lib/messages";
import sha256 from "sha256";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, message: messages.missingFormData });
    }

    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
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
        await prisma.user.update({
            where: {
                email: req.body.email,
            },
            data: {
                hash: sha256(req.body.password + process.env.PASSWORD_SALT),
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true });
};
