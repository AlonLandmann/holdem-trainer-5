import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const userId = Number(req.query.userId);

        const trainingTotals = await prisma.trainingUnit.aggregate({
          where: {
            trainingSession: {
              is: {
                userId,
              }
            }
          },
          _sum: {
            correct: true,
            total: true,
            score: true,
          },
        });

        if (!trainingTotals) {
          return res.status(200).json({ success: false, message: 'Training totals not found.' });
        }

        return res.status(200).json({ success: true, trainingTotals: trainingTotals._sum });
      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}