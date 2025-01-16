import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (
        !req.body ||
        !req.body.userId ||
        !req.body.sessionId ||
        !req.body.rangeId ||
        typeof req.body.correct !== "boolean" ||
        typeof req.body.complexity !== "number"
    ) {
        return res.status(400).json({ success: false, message: messages.missingFormData });
    }

    let trainingSession;

    try {
        trainingSession = await prisma.trainingSession.findUnique({
            where: {
                id: req.body.sessionId,
            },
        });

        if (!trainingSession) {
            trainingSession = await prisma.trainingSession.create({
                data: {
                    id: req.body.sessionId,
                    userId: req.body.userId,
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    let trainingUnit;

    try {
        trainingUnit = await prisma.trainingUnit.findFirst({
            where: {
                rangeId: req.body.rangeId || null,
                trainingSessionId: req.body.sessionId || null,
            },
        });

        if (!trainingUnit) {
            await prisma.trainingUnit.create({
                data: {
                    rangeId: req.body.rangeId,
                    trainingSessionId: req.body.sessionId,
                    correct: Number(req.body.correct),
                    total: 1,
                    complexity: req.body.complexity,
                    score: req.body.correct ? req.body.complexity : 0,
                }
            });
        } else {
            await prisma.trainingUnit.updateMany({
                where: {
                    rangeId: req.body.rangeId,
                    trainingSessionId: req.body.sessionId,
                },
                data: {
                    correct: {
                        increment: Number(req.body.correct),
                    },
                    total: {
                        increment: 1,
                    },
                    score: {
                        increment: req.body.correct ? req.body.complexity : 0,
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true });
};