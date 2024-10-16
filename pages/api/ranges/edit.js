import { toStorageFormat } from '@/lib/ranges'
import handleUserRequest from '@/lib/routes'
import { computeComplexity } from '@/lib/stats'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PUT', async (prisma, user) => {
    let range = req.body
    range.complexity = computeComplexity(range)
    const updatedRange = toStorageFormat(range)

    await prisma.range.update({
      where: {
        id: updatedRange.id
      },
      data: {
        stacks: updatedRange.stacks,
        history: updatedRange.history,
        options: updatedRange.options,
        matrix: updatedRange.matrix,
        complexity: updatedRange.complexity,
        predecessor: updatedRange.predecessorId
          ? { connect: { id: updatedRange.predecessorId } }
          : { disconnect: true }
      }
    })

    return { success: true, message: 'Changes saved.' }
  })
}