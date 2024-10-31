import { sendVerificationLink } from '@/lib/email'
import prisma from '@/lib/prisma'
import { v4 as uuid } from 'uuid'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { sessionId } = req.cookies

        const user = await prisma.user.findFirst({
          where: {
            session: {
              is: {
                token: sessionId || null
              }
            }
          }
        })

        if (!user) {
          return res.status(200).json({ success: false, message: 'User not logged in.' })
        }

        if (user.isVerified) {
          return res.status(200).json({ success: false, message: 'User is already verified.' })
        }

        const token = uuid()

        await prisma.user.update({
          where: {
            email: user.email
          },
          data: {
            isVerified: false,
            verificationToken: token
          }
        })

        sendVerificationLink(user.email, token)
        return res.status(200).json({ success: true })

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}