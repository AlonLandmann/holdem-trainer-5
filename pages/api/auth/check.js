import prisma from '@/lib/server/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { sessionId } = req.cookies

        const user = await prisma.user.findFirst({
          where: {
            session: {
              is: {
                token: sessionId
              }
            }
          },
          include: {
            settings: true,
            folders: {
              include: {
                ranges: true
              }
            }
          }
        })

        if (!user) {
          return res.status(200).json({ success: false })
        }

        return res.status(200).json({ success: true, user })

      default:
        res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}