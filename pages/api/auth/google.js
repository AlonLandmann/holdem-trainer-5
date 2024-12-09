import { getGoogleUserInfo } from '@/lib/google'
import prisma from '@/lib/prisma'
import sampleFolders from '../../../prisma/sample-ranges.json'

const folderCreateArray = sampleFolders.map(folder => ({
  index: folder.index,
  name: `${folder.name} (sample)`,
  ranges: {
    create: folder.ranges.map(range => ({
      index: range.index,
      name: range.name,
      stacks: range.stacks,
      history: range.history,
      options: range.options,
      matrix: Buffer.from(range.matrix),
      complexity: range.complexity,
    }))
  }
}));

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { email, name, id } = await getGoogleUserInfo(req);

        const foundByIdUser = await prisma.user.findUnique({
          where: {
            googleId: id,
          },
        });

        if (foundByIdUser) {
          await prisma.session.deleteMany({
            where: {
              userId: foundByIdUser.id
            }
          })

          const newSession = await prisma.session.create({
            data: {
              user: {
                connect: { 
                  id: foundByIdUser.id,
                },
              },
            },
          });

          res.setHeader("Set-Cookie", `sessionId=${newSession.token}; Path=/; Max-Age=${30 * 24 * 60 * 60}; HttpOnly; Secure; SameSite=Lax`);
        }

        if (!foundByIdUser) {
          const foundByEmailUser = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (foundByEmailUser) {
            return res.redirect('/auth/login?googleAuth=fail');
          }

          const newUser = await prisma.user.create({
            data: {
              email,
              username: name,
              googleId: id,
              isVerified: true,
              session: { create: {} },
              settings: { create: {} },
              folders: { create: folderCreateArray },
            },
            select: {
              session: {
                select: {
                  token: true,
                }
              }
            }
          });

          res.setHeader("Set-Cookie", `sessionId=${newUser.session.token}; Path=/; Max-Age=${30 * 24 * 60 * 60}; HttpOnly; Secure; SameSite=Lax`);
        }

        return res.redirect('/app/overview')

      default:
        res.redirect('/auth/login?googleAuth=fail')
    }
  } catch (error) {
    console.log(error)
    res.redirect('/auth/login?googleAuth=fail')
  }
}
