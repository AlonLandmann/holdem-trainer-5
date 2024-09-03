import { toStorageFormat } from '@/lib/server/ranges'
import handleUserRequest from '@/lib/server/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'POST', async (prisma, user) => {
    const range = toStorageFormat(req.body.range)

    await prisma.range.create({
      data: {
        index: user.folders.find(f => f.id === range.folderId).ranges.length,
        name: range.name + ' copy',
        stacks: range.stacks,
        history: range.history,
        options: range.options,
        matrix: range.matrix,
        folder: { connect: { id: folder.id } },
        predecessor: range.predecessorId
          ? { connect: { id: range.predecessorId } }
          : null
      }
    })

    return true
  })
}