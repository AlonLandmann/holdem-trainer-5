import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';

// FIX not yet secured

export default apiRoute('PATCH', async (req, res) => {
  const folderId = Number(req.query.folderId);
  const name = req.body.name;

  if (name.length < 2 || name.length > 30) {
    return res.status(200).json({ success: false, message: 'Folder names should be between 2 and 30 characters long.' });
  }

  await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      name,
    },
  });

  return res.status(200).json({ success: true, message: 'Folder renamed.' });
});