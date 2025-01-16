import prisma from "@/lib/prisma";
import { actionToStorage, optionToStorage, toClientFormat } from "@/lib/ranges";
import messages from "@/lib/messages";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    if (!req.query.userId || !req.query.history || !req.query.option) {
        return res.status(400).json({ success: false, message: messages.missingQueryData });
    }

    let historyToMatch;
    let optionToMatch;

    try {
        historyToMatch = JSON.parse(req.query.history);
        optionToMatch = JSON.parse(req.query.option);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: messages.corruptedInput });
    }

    let ranges;

    try {
        ranges = await prisma.range.findMany({
            where: {
                folder: {
                    is: {
                        userId: Number(req.query.userId),
                    },
                },
                history: {
                    equals: historyToMatch.map(a => actionToStorage(a)),
                },
                options: {
                    has: optionToStorage(optionToMatch),
                },
            },
        });

        ranges = ranges.map(r => toClientFormat(r));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true, ranges: ranges });
};
