import { toStorageFormat } from '@/lib/ranges'
import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'POST', async (prisma, user) => {
    const range = toStorageFormat(req.body)

    await prisma.range.create({
      data: {
        index: user.folders.find(f => f.id === range.folderId).ranges.length,
        name: range.name + ' copy',
        stacks: range.stacks,
        history: range.history,
        options: range.options,
        matrix: range.matrix,
        complexity: range.complexity,
        folder: { connect: { id: range.folderId } },
        predecessor: range.predecessorId
          ? { connect: { id: range.predecessorId } }
          : undefined
      }
    })

    return { success: true, message: 'Range duplicated.' }
  })
}