import apiRoute from '@/lib/apiRoute';
import prisma from '@/lib/prisma';

// FIX not yet secured

export default apiRoute('PATCH', async (req, res) => {
  const rangeId = Number(req.query.rangeId);
  const name = req.body.name;

  if (name.length < 2 || name.length > 50) {
    return res.status(200).json({ success: false, message: 'Range names should be between 2 and 50 characters long.' });
  }

  await prisma.range.update({
    where: {
      id: rangeId,
    },
    data: {
      name,
    },
  });

  return res.status(200).json({ success: true, message: 'Range renamed.' });
});