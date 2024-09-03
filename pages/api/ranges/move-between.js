import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const {
      rangeId,
      rangeIndex,
      folderOriginId,
      folderTargetId,
      folderTargetLength
    } = req.body

    if (folderOriginId === folderTargetId) {
      return { success: true }
    }

    await prisma.$transaction([
      prisma.range.update({
        where: {
          id: rangeId
        },
        data: {
          index: folderTargetLength,
          folder: {
            connect: { id: folderTargetId }
          }
        }
      }),

      prisma.range.update({
        where: {
          folderId: folderOriginId,
          index: { gt: rangeIndex }
        },
        data: {
          index: { decrement: 1 }
        }
      })
    ])

    return { success: true, message: 'Range moved.' }
  })
}