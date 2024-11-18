import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const userId = Number(req.query.userId);

        const folders = await prisma.folder.findMany({
          where: {
            userId,
          },
          include: {
            ranges: {
              select: {
                id: true,
                index: true,
                name: true,
              },
              orderBy: {
                index: 'asc',
              },
            },
          },
          orderBy: {
            index: 'asc',
          },
        });

        if (!folders) {
          return res.status(200).json({ success: false, message: 'Folders not found.' });
        }

        return res.status(200).json({ success: true, folders });
      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}