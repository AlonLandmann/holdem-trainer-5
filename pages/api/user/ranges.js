import prisma from "@/lib/prisma";
import messages from "@/lib/messages";
import { toClientFormat } from "@/lib/ranges";

// either receive rangeIds
// or all=true and userId
// horrible route (split into two or do loading differently)

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  let ranges;

  if (req.query.all === "true" && req.query.userId) {
    try {
      ranges = await prisma.range.findMany({
        where: {
          folder: {
            is: {
              userId: Number(req.query.userId),
            },
          },
        },
        include: {
          successors: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          {
            folder: {
              index: "asc",
            },
          },
          {
            index: "asc",
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: messages.internalServerError });
    }

    if (!ranges) {
      return res.status(400).json({ success: false, message: "Ranges not found." });
    }

    ranges = ranges.map(r => toClientFormat(r));

    return res.status(200).json({ success: true, ranges: ranges });
  }

  if (!req.query.rangeIds) {
    return res.status(400).json({ success: false, message: messages.missingQueryData });
  }

  let rangeIds;

  try {
    rangeIds = JSON.parse(req.query.rangeIds);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: messages.corruptedInput });
  }

  try {
    ranges = await prisma.range.findMany({
      where: {
        id: {
          in: rangeIds,
        },
      },
      include: {
        successors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!ranges) {
    return res.status(400).json({ success: false, message: "Ranges not found." });
  }

  ranges = ranges.map(r => toClientFormat(r));

  return res.status(200).json({ success: true, ranges: ranges });
};
