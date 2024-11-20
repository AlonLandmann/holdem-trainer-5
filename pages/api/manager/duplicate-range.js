import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';
import { toStorageFormat } from '@/lib/ranges';

// FIX not yet completely secure

export default apiRoute('POST', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const range = toStorageFormat(req.body);

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
    include: {
      folders: {
        include: {
          ranges: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found.' });
  }

  await prisma.range.create({
    data: {
      index: user.folders.find(f => f.id === range.folderId).ranges.length,
      name: `${range.name} (copy)`,
      stacks: range.stacks,
      history: range.history,
      options: range.options,
      matrix: range.matrix,
      complexity: range.complexity,
      folderId: range.folderId,
      predecessor: range.predecessorId
        ? { connect: { id: range.predecessorId } }
        : undefined,
    },
  });

  return res.status(200).json({ success: true, message: 'Range duplicated' });
});