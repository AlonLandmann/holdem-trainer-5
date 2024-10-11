import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PATCH', async (prisma, user) => {
    await prisma.settings.update({
      where: { userId: user.id },
      data: req.body,
    })

    return { success: true }
  })
}