import { sendPasswordResetCode } from '@/lib/email'
import prisma from '@/lib/prisma'
import { random } from 'lodash'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { email } = req.body
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          return res.status(200).json({ success: false, message: 'No user with this email was found.' })
        }

        const randomCode = `${random(9)}${random(9)}${random(9)}${random(9)}${random(9)}${random(9)}`
        
        await prisma.user.update({
          where: {
            email
          },
          data: {
            passwordResetCode: randomCode
          }
        })

        sendPasswordResetCode(email, randomCode)

        return res.status(200).json({ success: true })

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}