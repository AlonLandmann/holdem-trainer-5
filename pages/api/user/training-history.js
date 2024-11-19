import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const userId = Number(req.query.userId);

        const trainingHistory = await prisma.$queryRaw`
          SELECT
            DATE_TRUNC('day', ts."createdAt") AS "date",
            SUM(tu.total) AS "total",
            SUM(tu.correct) AS "correct",
            SUM(tu.score) AS "score"
          FROM
            "TrainingSession" ts
          JOIN
            "TrainingUnit" tu ON tu."trainingSessionId" = ts.id
          WHERE
            ts."userId" = ${userId}
          GROUP BY
            DATE_TRUNC('day', ts."createdAt")
          ORDER BY
            "date" ASC;
        `;

        if (!trainingHistory) {
          return res.status(200).json({ success: false, message: 'History not found.' });
        }

        const formattedHistory = trainingHistory.map(item => ({
          date: item.date.toISOString().slice(0, 10),
          total: Number(item.total),
          correct: Number(item.correct),
          score: Number(item.score),
        }));

        return res.status(200).json({ success: true, trainingHistory: formattedHistory })
      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}