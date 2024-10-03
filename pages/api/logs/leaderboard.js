import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const leaderboard = await prisma.$queryRaw`
          SELECT
            u.id,
            u.email,
            u.username,
            COALESCE(SUM(tu.score), 0) AS "totalScore"
          FROM
            "User" u
          LEFT JOIN
            "TrainingSession" ts ON ts."userId" = u.id
          LEFT JOIN
            "TrainingUnit" tu ON tu."trainingSessionId" = ts.id
          GROUP BY
            u.id
          ORDER BY
            "totalScore" DESC;
        `;

        return res.status(200).json({ success: true, leaderboard })

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}