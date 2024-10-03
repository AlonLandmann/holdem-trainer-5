import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    const rangeId = Number(req.query.rangeId)
    const { name } = req.body

    await prisma.range.update({
      where: {
        id: rangeId
      },
      data: {
        name
      }
    })

    return { success: true, message: 'Range renamed.' }
  })
}