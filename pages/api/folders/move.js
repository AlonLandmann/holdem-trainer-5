import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const { origin, target } = req.body

    if (origin === target || origin === target + 1) {
      return res.status(200).json({ success: true })
    }

    await prisma.$transaction([
      prisma.folder.update({
        where: {
          user: user.id,
          index: origin
        },
        data: {
          index: target > origin ? target - 1 : target
        }
      }),

      prisma.folder.update({
        where: {
          user: user.id,
          index: {
            gt: target > origin ? origin : target - 1,
            lt: target > origin ? target : origin
          }
        },
        data: {
          index: target > origin ? { decrement: 1 } : { incremend: 1 }
        }
      })
    ])

    return res.status(200).json({ success: true })
  })
}