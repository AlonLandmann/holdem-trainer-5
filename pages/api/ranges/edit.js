import { toStorageFormat } from '@/lib/ranges'
import handleUserRequest from '@/lib/routes'

export default async function handler(req, res) {
  return handleUserRequest(req, res, 'PUT', async (prisma, user) => {
    const updatedRange = toStorageFormat(req.body)

    await prisma.range.update({
      where: {
        id: updatedRange.id
      },
      data: {
        stacks: updatedRange.stacks,
        history: updatedRange.history,
        options: updatedRange.options,
        matrix: updatedRange.matrix,
        predecessor: updatedRange.predecessorId
          ? { connect: { id: updatedRange.predecessorId } }
          : { disconnect: true }
      }
    })

    return { success: true, message: 'Changes saved.' }
  })
}