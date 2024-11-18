import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const all = Boolean(req.query.all);
        const userId = Number(req.query.userId);
        const rangeIds = req.query.rangeIds && JSON.parse(req.query.rangeIds);

        let ranges;

        if (all && userId) {
          ranges = await prisma.range.findMany({
            where: {
              folder: {
                is: {
                  userId,
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
          });
        } else if (rangeIds) {
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
        }

        if (!ranges) {
          return res.status(200).json({ success: false, message: 'Ranges not found.' });
        }

        const formattedRanges = ranges.map(r => toClientFormat(r));

        return res.status(200).json({ success: true, ranges: formattedRanges });
      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}