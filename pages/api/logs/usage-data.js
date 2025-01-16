import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
    }

    let usageInfo = {};

    try {
        usageInfo.nrUsers = await prisma.user.count();
        usageInfo.nrRanges = await prisma.range.count();
        usageInfo.nrCombos = await prisma.trainingUnit.aggregate({
            _sum: {
                total: true,
            },
        });

        usageInfo.nrCombos = usageInfo.nrCombos._sum.total || 0;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    return res.status(200).json({ success: true, usageInfo });
};
