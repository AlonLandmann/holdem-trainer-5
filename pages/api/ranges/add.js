import handleUserRequest from '@/lib/routes'
import { defaultMatrixBuffer } from '@/lib/ranges'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'POST', async (prisma, user) => {
    const folderId = Number(req.query.folderId)
    
    const searchFilter = folderId
      ? { id: folderId }
      : { name: 'New Folder', userId: user.id }

    let folder = await prisma.folder.findFirst({
      where: searchFilter,
      include: { ranges: true }
    })

    if (!folder) {
      folder = await prisma.folder.create({
        data: {
          index: user.folders.length,
          user: { connect: { id: user.id } }
        },
        include: {
          ranges: true
        }
      })
    }

    await prisma.range.create({
      data: {
        index: folder.ranges.length,
        matrix: defaultMatrixBuffer,
        folder: { connect: { id: folder.id } }
      }
    })

    return { success: true, message: 'Range added.' }
  })
}