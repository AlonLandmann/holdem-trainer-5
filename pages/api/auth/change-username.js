import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'PATCH':
        const { userId, username } = req.body

        const existing = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (existing) {
          return res.status(200).json({ success: false, message: 'Username already exists.' })
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            username
          }
        })

        return res.status(200).json({ success: true, message: 'Username changed.', updatedUser })

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}