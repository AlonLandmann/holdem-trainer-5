import { sendVerificationLink } from "@/lib/email";
import prisma from "@/lib/prisma";
import { generateUsername } from "@/lib/usernames";
import { validateEmail, validatePassword } from "@/lib/validate";
import sampleFolders from "@/prisma/sample-ranges.json";
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

    if (!validateEmail(req.body.email)) {
        return res.status(422).json({ success: false, message: "Email validation failed." });
    }

    if (!validatePassword(req.body.password)) {
        return res.status(422).json({ success: false, message: "Password validation failed." });
    }

    let existingUser;

    try {
        existingUser = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (existingUser) {
        return res.status(409).json({ success: false, message: "A user with this email address already exists. Try to log in instead." });
    }

    let userNameCandidate = generateUsername();
    let conflictingUsers;
    let conflictingEndings;

    try {
        conflictingUsers = await prisma.user.findMany({
            where: {
                username: {
                    startsWith: userNameCandidate,
                },
            },
            select: {
                username: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    conflictingEndings = conflictingUsers.map(u => Number(u.username.slice(userNameCandidate.length)));

    if (conflictingEndings.length > 0) {
        userNameCandidate = `${userNameCandidate} ${String(conflictingEndings[conflictingEndings.length - 1] + 1)}`;
    }

    let newUser;

    try {
        newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                username: userNameCandidate,
                hash: sha256(req.body.password + process.env.PASSWORD_SALT),
                sessionCookie: v4(),
                settings: {
                    create: {},
                },
                folders: {
                    create: sampleFolders.map(folder => ({
                        index: folder.index,
                        name: `${folder.name} (sample)`,
                        ranges: {
                            create: folder.ranges.map(range => ({
                                index: range.index,
                                name: range.name,
                                stacks: range.stacks,
                                history: range.history,
                                options: range.options,
                                matrix: Buffer.from(range.matrix),
                                complexity: range.complexity,
                            })),
                        },
                    })),
                },
            },
            select: {
                email: true,
                verificationToken: true,
                sessionCookie: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    res.setHeader("Set-Cookie", `holdemTrainerSessionId=${newUser.sessionCookie}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);

    sendVerificationLink(newUser.email, newUser.verificationToken);

    return res.status(201).json({ success: true });
};
