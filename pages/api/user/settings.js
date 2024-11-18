import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const userId = Number(req.query.userId);

        const settings = await prisma.settings.findUnique({
          where: {
            userId,
          }
        });

        if (!settings) {
          return res.status(200).json({ success: false, message: 'Settings not found.' });
        }

        return res.status(200).json({ success: true, settings });
      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}