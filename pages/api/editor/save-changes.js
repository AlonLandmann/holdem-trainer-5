import prisma from "@/lib/prisma";
import { toStorageFormat } from "@/lib/ranges";
import { computeComplexity } from "@/lib/stats";
import messages from "@/lib/messages";

export default async function (req, res) {
    if (req.method !== "PUT") {
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
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!user) {
        return res.status(401).json({ success: false, message: messages.userNotFound });
    }

    let range;

    try {
        range = req.body;
        range.complexity = computeComplexity(range);
        range = toStorageFormat(range);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: messages.corruptedInput });
    }

    try {
        await prisma.range.update({
            where: {
                id: range.id,
                folder: {
                    is: {
                        userId: user.id,
                    },
                },
            },
            data: {
                stacks: range.stacks,
                history: range.history,
                options: range.options,
                matrix: range.matrix,
                complexity: range.complexity,
                predecessorId: range.predecessorId,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true });
};
