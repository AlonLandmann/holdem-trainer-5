import { setSessionCookie } from '@/lib/server/cookies'
import prisma from '@/lib/server/prisma'
import sha256 from 'sha256'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          return res.status(200).json({ success: false, message: 'No user with this email was found.' })
        }

        if (user.googleId) {
          return res.status(200).json({ success: false, message: 'This email is linked to a google account, please sign in using google.' })
        }

        if (sha256(password) !== user.hash) {
          return res.status(200).json({ success: false, message: 'The password is incorrect.' })
        }

        await prisma.session.deleteMany({
          where: {
            userId: user.id
          }
        })

        const newSession = await prisma.session.create({
          data: {
            user: {
              connect: { 
                id: user.id 
              }
            }
          }
        })

        setSessionCookie(res, newSession.token)
        return res.status(200).json({ success: true })

      default:
        res.status(400).json({ success: false, message: TOASTS.invalidRequest })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: TOASTS.internalServerError })
  }
}
