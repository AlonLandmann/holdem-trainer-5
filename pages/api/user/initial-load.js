import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.cookies.holdemTrainerSessionId) {
        return res.status(401).json({ success: false, message: messages.noSessionDetected });
    }

    let userQueryObject = {
        where: {
            sessionCookie: req.cookies.holdemTrainerSessionId,
        },
        select: {
            id: true,
            createdAt: true,
            email: true,
            username: true,
            googleId: true,
            isVerified: true,
            role: true,
            membership: true,
        },
    };

    if (req.query.settings === "true") {
        userQueryObject.select.settings = {
            select: {
                deselectAfterBrush: true,
                afterPredecessorEdit: true,
                defaultSessionLength: true,
                hotkeyInfoDismissed: true,
            },
        };
    }

    if (req.query.folders === "true") {
        userQueryObject.select.folders = {
            include: {
                ranges: {
                    select: {
                        id: true,
                        index: true,
                        name: true,
                    },
                    orderBy: {
                        index: "asc",
                    },
                },
            },
            orderBy: {
                index: "asc",
            },
        };
    }

    let user;

    try {
        user = await prisma.user.findUnique(userQueryObject);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(200).json({ success: false, message: messages.userNotFound });
    }

    user.isGoogleUser = Boolean(user.googleId);
    delete user.googleId;

    return res.status(200).json({ success: true, user });
};