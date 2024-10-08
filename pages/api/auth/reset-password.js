import prisma from '@/lib/prisma'
import sha256 from 'sha256'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'PATCH':
        const { email, password } = req.body

        await prisma.user.update({
          where: {
            email
          },
          data: {
            hash: sha256(password)
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