import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  let leaderboard;

  try {
    leaderboard = await prisma.$queryRaw`
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
        "totalScore" DESC
      ;
    `;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(200).json({ success: true, leaderboard: leaderboard });
};
