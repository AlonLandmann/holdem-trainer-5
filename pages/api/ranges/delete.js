import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'DELETE', async (prisma, user) => {
    const { rangeId } = req.query

    await prisma.range.delete({
      where: {
        id: rangeId
      }
    })

    return res.status(200).json({ success: true })
  })
}