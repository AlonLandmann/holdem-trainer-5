import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const folderId = Number(req.query.folderId)
    const { name } = req.body

    await prisma.folder.update({
      where: {
        id: folderId
      },
      data: {
        name
      }
    })

    return { success: true, message: 'Folder renamed.' }
  })
}