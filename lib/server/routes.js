import prisma from '@/lib/server/prisma'

export default async function handleUserRequest(req, res, method, f) {
  try {
    if (req.method !== method) {
      return res.status(400).json({ sucess: false, message: 'Invalid request.' })
    }

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
      return res.status(400).json({ success: false, message: 'Unauthorized request.' })
    }

    return await f(prisma, user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}