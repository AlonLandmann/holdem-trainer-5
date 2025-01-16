import prisma from "@/lib/prisma";
import messages from "@/lib/messages";
import sha256 from "sha256";
import { v4 } from "uuid";

export default async function handler(req, res) {
    if (req.method !== "POST") {
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
            select: {
                hash: true,
                googleId: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(401).json({ success: false, message: messages.userWithEmailNotFound });
    }

    if (user.googleId) {
        return res.status(400).json({ success: false, message: "This email is linked to a google account, please sign in using google." });
    }

    if (sha256(req.body.password + process.env.PASSWORD_SALT) !== user.hash) {
        return res.status(401).json({ success: false, message: "Password is incorrect." });
    }

    try {
        user = await prisma.user.update({
            where: {
                email: req.body.email,
            },
            data: {
                sessionCookie: v4(),
            },
            select: {
                sessionCookie: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    res.setHeader("Set-Cookie", `holdemTrainerSessionId=${user.sessionCookie}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);

    return res.status(200).json({ success: true });
};
