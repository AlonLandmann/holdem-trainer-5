import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'DELETE', async (prisma, user) => {
    const folderId = Number(req.query.folderId)

    await prisma.folder.delete({
      where: {
        id: folderId
      }
    })

    return true
  })
}