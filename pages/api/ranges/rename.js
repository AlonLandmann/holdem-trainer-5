import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const { rangeId } = req.query
    const { name } = req.body

    await prisma.range.update({
      where: {
        id: rangeId
      },
      data: {
        name
      }
    })

    return res.status(200).json({ success: true })
  })
}