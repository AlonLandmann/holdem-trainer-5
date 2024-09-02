import handlePost from '@/lib/server/routes'

export default async function handler(req, res) {
  return handlePost(req, res, async (prisma, user) => {
    await prisma.folder.create({
      data: {
        index: user.folders.length,
        user: {
          connect: { id: user.id }
        }
      }
    })

    return res.status(200).json({ success: true })
  })
}