import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const {
      rangeId,
      rangeIndex,
      originFolderId,
      targetFolderId,
      targetFolderLength
    } = req.body

    if (originFolderId === targetFolderId) {
      return { success: true }
    }

    await prisma.$transaction([
      prisma.range.update({
        where: {
          id: rangeId
        },
        data: {
          index: targetFolderLength,
          folder: {
            connect: { id: targetFolderId }
          }
        }
      }),

      prisma.range.updateMany({
        where: {
          folderId: originFolderId,
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