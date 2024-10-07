import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { email, codeInput } = req.body
        const user = await prisma.user.findUnique({
          where: {
            email
          },
          select: {
            passwordResetCode: true
          }
        })

        if (!user) {
          return res.status(200).json({ success: false, message: 'No user with this email was found.' })
        }

        if (user.passwordResetCode !== codeInput) {
          return res.status(200).json({ success: false, message: 'The code entered is either incorrect or no longer valid.'})
        }
        
        await prisma.user.update({
          where: {
            email
          },
          data: {
            passwordResetCode: null
          }
        })

        return res.status(200).json({ success: true })

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}