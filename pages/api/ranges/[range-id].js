import prisma from '@/lib/server/prisma'
import { toClientFormat } from '@/lib/server/ranges'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const range = await prisma.range.findUnique({
          where: {
            id: Number(req.query['range-id'])
          }
        })

        return res.status(200).json({ success: true, range: toClientFormat(range) })

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}