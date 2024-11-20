import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';

export default apiRoute('DELETE', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const folderId = Number(req.query.folderId);
  const folderIndex = Number(req.query.folderIndex);

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

  // <--- for ultimate security: make sure the user has the authority to delete the folder with this id.

  await prisma.$transaction([
    prisma.folder.delete({
      where: {
        id: folderId,
      },
    }),
    prisma.folder.updateMany({
      where: {
        userId: user.id,
        index: {
          gt: folderIndex,
        },
      },
      data: {
        index: {
          decrement: 1,
        },
      },
    }),
  ]);

  return res.status(200).json({ success: true, message: 'Folder deleted.' });
});