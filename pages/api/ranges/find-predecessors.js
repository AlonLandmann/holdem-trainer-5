import prisma from '@/lib/prisma'
import { actionToStorage, optionToStorage, toClientFormat } from '@/lib/ranges'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const userId = Number(req.query.userId)
        const historyToMatch = JSON.parse(req.query.history)
        const optionToMatch = JSON.parse(req.query.option)

        const candidateRanges = await prisma.range.findMany({
          where: {
            folder: {
              is: { userId }
            },
            history: {
              equals: historyToMatch.map(a => actionToStorage(a))
            },
            options: {
              has: optionToStorage(optionToMatch)
            }
          }
        })

        const clientRanges = candidateRanges.map(r => toClientFormat(r))
        return res.status(200).json({ success: true, ranges: clientRanges })

      default:
        res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}