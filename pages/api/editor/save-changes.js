import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';
import { toStorageFormat } from '@/lib/ranges';
import { computeComplexity } from '@/lib/stats';

export default apiRoute('PUT', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const range = req.body;

  if (!sessionId) {
    return res.status(400).json({ success: false, message: 'Unauthorized request. You may need to log in again.' });
  }

  const user = await prisma.user.findFirst({
    where: {
      session: {
        is: {
          token: sessionId,
        },
      },
    },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found.' });
  }

  range.complexity = computeComplexity(range);
  const updatedRange = toStorageFormat(range);

  await prisma.range.update({
    where: {
      id: updatedRange.id,
    },
    data: {
      stacks: updatedRange.stacks,
      history: updatedRange.history,
      options: updatedRange.options,
      matrix: updatedRange.matrix,
      complexity: updatedRange.complexity,
      predecessor: updatedRange.predecessorId
        ? { connect: { id: updatedRange.predecessorId } }
        : { disconnect: true },
    },
  });

  return res.status(200).json({ success: true, message: 'Changes saved.' });
});
