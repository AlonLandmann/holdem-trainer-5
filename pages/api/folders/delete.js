import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'DELETE', async (prisma, user) => {
    const { folderId } = req.query

    await prisma.folder.delete({
      where: {
        id: folderId
      }
    })

    return res.status(200).json({ success: true })
  })
}