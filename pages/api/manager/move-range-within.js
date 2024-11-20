import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';

// FIX not completely secure yet?

export default apiRoute('PATCH', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const { origin, originId, target } = req.body;

  if (target === origin || target === origin + 1) {
    return res.status(200).json({ success: true });
  }

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

  await prisma.$transaction([
    prisma.range.updateMany({
      where: {
        folder: {
          is: {
            userId: user.id,
          },
        },
        index: {
          gt: target > origin ? origin : target - 1,
          lt: target > origin ? target : origin,
        },
      },
      data: {
        index: target > origin ? { decrement: 1 } : { increment: 1 },
      },
    }),
    prisma.range.update({
      where: {
        id: originId,
      },
      data: {
        index: target > origin ? target - 1 : target,
      },
    }),
  ]);

  return res.status(200).json({ success: true, message: 'Range moved.' });
});