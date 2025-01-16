import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.query.userId) {
        return res.status(400).json({ success: false, message: messages.missingQueryData });
    }

    let trainingTotals;

    try {
        trainingTotals = await prisma.trainingUnit.aggregate({
            where: {
                trainingSession: {
                    is: {
                        userId: Number(req.query.userId),
                    },
                },
            },
            _sum: {
                correct: true,
                total: true,
                score: true,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!trainingTotals) {
        return res.status(401).json({ success: false, message: "Training totals not found." });
    }

    if (!trainingTotals._sum.correct) {
        trainingTotals._sum.correct = 0;
    }

    if (!trainingTotals._sum.total) {
        trainingTotals._sum.total = 0;
    }

    if (!trainingTotals._sum.score) {
        trainingTotals._sum.score = 0;
    }

    return res.status(200).json({ success: true, trainingTotals: trainingTotals._sum });
};