import { sendVerificationLink } from "@/lib/email";
import prisma from "@/lib/prisma";
import messages from "@/lib/messages";
import { v4 } from "uuid";

export default async function handler(req, res) {
    if (req.method !== "POST") {
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
                isVerified: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(401).json({ success: false, message: messages.userNotFound });
    }

    if (user.isVerified) {
        return res.status(400).json({ success: false, message: "Email is already verified." });
    }

    try {
        user = await prisma.user.update({
            where: {
                sessionCookie: req.cookies.holdemTrainerSessionId,
            },
            data: {
                verificationToken: v4(),
            },
            select: {
                email: true,
                verificationToken: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    sendVerificationLink(user.email, user.verificationToken);

    return res.status(200).json({ success: true });
};
