import { toStorageFormat } from '@/lib/ranges'
import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'POST', async (prisma, user) => {
    const range = toStorageFormat(req.body)

    const existingFolders = await prisma.folder.findMany({
      where: {
        userId: user.id,
        name: 'Academy',
      },
      select: {
        id: true,
      }
    })

    let targetFolderId;

    if (existingFolders.length > 0) {
      targetFolderId = existingFolders[0].id
    } else {
      const totalFolders = await prisma.folder.count({ where: { userId: user.id } })
      const newFolder = await prisma.folder.create({
        data: {
          index: totalFolders,
          name: 'Academy',
          user: {
            connect: {
              id: user.id
            }
          }
        },
        select: {
          id: true
        }
      })

      targetFolderId = newFolder.id
    }

    await prisma.range.create({
      data: {
        name: range.name,
        stacks: range.stacks,
        history: range.history,
        options: range.options,
        matrix: range.matrix,
        complexity: range.complexity,
        index: 0,
        folder: {
          connect: {
            id: targetFolderId
          }
        }
      }
    })

    return { success: true, message: 'Range duplicated.' }
  })
}