import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const { origin, originId, target } = req.body

    if (target === origin || target === origin + 1) {
      return { success: true }
    }

    await prisma.$transaction([
      prisma.folder.updateMany({
        where: {
          userId: user.id,
          index: {
            gt: target > origin ? origin : target - 1,
            lt: target > origin ? target : origin
          }
        },
        data: {
          index: target > origin ? { decrement: 1 } : { increment: 1 }
        }
      }),

      prisma.folder.update({
        where: {
          id: originId
        },
        data: {
          index: target > origin ? target - 1 : target
        }
      })
    ])

    return { success: true, message: 'Folder moved.' }
  })
}