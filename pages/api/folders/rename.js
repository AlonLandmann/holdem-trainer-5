import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const { folderId } = req.query
    const { name } = req.body

    await prisma.folder.update({
      where: {
        id: folderId
      },
      data: {
        name
      }
    })

    return res.status(200).json({ success: true })
  })
}