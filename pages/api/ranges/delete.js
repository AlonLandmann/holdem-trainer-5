import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'DELETE', async (prisma, user) => {
    const rangeId = Number(req.query.rangeId)
    const rangeIndex = Number(req.query.rangeIndex)
    const folderId = Number(req.query.folderId)

    await prisma.$transaction([
      prisma.range.delete({
        where: {
          id: rangeId
        }
      }),

      prisma.range.updateMany({
        where: {
          folderId,
          index: { gt: rangeIndex }
        },
        data: {
          index: { decrement: 1 }
        }
      })
    ])

    return { success: true, message: 'Range removed.' }
  })
}