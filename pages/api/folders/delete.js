import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'DELETE', async (prisma, user) => {
    const folderId = Number(req.query.folderId)
    const folderIndex = Number(req.query.folderIndex)

    await prisma.$transaction([
      prisma.folder.delete({
        where: {
          id: folderId
        }
      }),

      prisma.folder.updateMany({
        where: {
          userId: user.id,
          index: { gt: folderIndex }
        },
        data: {
          index: { decrement: 1 }
        }
      })
    ])
    
    return { success: true, message: 'Folder removed.' }
  })
}