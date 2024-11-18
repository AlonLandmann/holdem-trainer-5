import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        if (!req.cookies.sessionId) {
          return res.status(200).json({ success: false, message: 'User session not detected.' });
        }

        const userQueryObject = {
          where: {
            session: {
              is: {
                token: req.cookies.sessionId
              }
            }
          },
          select: {
            id: true,
            createdAt: true,
            email: true,
            username: true,
            googleId: true,
            isVerified: true,
            role: true,
            membership: true,
          },
        };

        if (req.query.settings === 'true') {
          userQueryObject.select.settings = {
            select: {
              deselectAfterBrush: true,
              afterPredecessorEdit: true,
              defaultSessionLength: true,
              hotkeyInfoDismissed: true,
            },
          };
        }

        if (req.query.folders === 'true') {
          userQueryObject.select.folders = {
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
          };
        }

        const user = await prisma.user.findFirst(userQueryObject);

        if (!user) {
          return res.status(200).json({ success: false, message: 'User not found.' });
        }

        user.isGoogleUser = Boolean(user.googleId);
        delete user.googleId;

        return res.status(200).json({ success: true, user });

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}