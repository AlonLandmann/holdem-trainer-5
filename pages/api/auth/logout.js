import { removeSessionCookie } from '@/lib/cookies'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { sessionId } = req.cookies

        if (sessionId) {
          await prisma.session.deleteMany({
            where: {
              token: sessionId || null
            }
          })
        }

        removeSessionCookie(res)
        return res.status(200).json({ success: true })

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}