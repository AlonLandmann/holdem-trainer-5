import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';
import { defaultMatrixBuffer } from '@/lib/ranges';

export default apiRoute('POST', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const folderId = Number(req.query.folderId);

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
      folders: true,
    },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found.' });
  }

  // FIX still not completely secure

  let folder = await prisma.folder.findFirst({
    where: folderId
      ? { id: folderId }
      : { name: 'New Folder', userId: user.id },
    include: {
      ranges: true,
    },
  });

  if (!folder) {
    folder = await prisma.folder.create({
      data: {
        index: user.folders.length,
        userId: user.id,
      },
      include: {
        ranges: true,
      },
    });
  }

  await prisma.range.create({
    data: {
      index: folder.ranges.length,
      matrix: defaultMatrixBuffer,
      folderId: folder.id,
    }
  });

  return res.status(200).json({ success: true, message: 'Range added.' });
});