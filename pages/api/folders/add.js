import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'POST', async (prisma, user) => {
    await prisma.folder.create({
      data: {
        index: user.folders.length,
        user: { connect: { id: user.id } }
      }
    })

    return { success: true, message: 'Folder added.' }
  })
}