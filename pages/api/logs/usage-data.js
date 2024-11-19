import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const nrUsers = await prisma.user.count({})
        const nrRanges = await prisma.range.count({})
        const nrCombos = await prisma.trainingUnit.aggregate({ _sum: { total: true } });

        const usageInfo = {
          nrUsers,
          nrRanges,
          nrCombos: nrCombos._sum.total,
        };

        return res.status(200).json({ success: true, usageInfo });

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}