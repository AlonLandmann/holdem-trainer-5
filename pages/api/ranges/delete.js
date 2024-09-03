import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'DELETE', async (prisma, user) => {
    const rangeId = Number(req.query.rangeId)

    await prisma.range.delete({
      where: {
        id: rangeId
      }
    })

    return { success: true, message: 'Range removed.' }
  })
}