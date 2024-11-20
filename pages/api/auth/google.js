import { setSessionCookie } from '@/lib/cookies'
import { getGoogleUserInfo } from '@/lib/google'
import prisma from '@/lib/prisma'
import sampleFolders from '../../../prisma/sample-ranges.json'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { email, name, id } = await getGoogleUserInfo(req)
        const foundByIdUser = await prisma.user.findUnique({
          where: {
            googleId: id
          }
        })

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
                  id: foundByIdUser.id 
                }
              }
            }
          })

          setSessionCookie(res, newSession.token)
        }

        if (!foundByIdUser) {
          const foundByEmailUser = await prisma.user.findUnique({
            where: {
              email
            }
          })

          if (foundByEmailUser) {
            return res.redirect('/auth/login?googleAuth=fail')
          }

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
          }))

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
              id: true,
              session: {
                select: {
                  token: true,
                }
              }
            }
          });

          const predecessorConnections = {
            'UTG vs HJ 3-bet': 'UTG Open',
            'UTG vs CO 3-bet': 'UTG Open',
            'UTG vs BTN 3-bet': 'UTG Open',
            'UTG vs SB 3-bet': 'UTG Open',
            'UTG vs BB 3-bet': 'UTG Open',
            'HJ vs CO 3-bet': 'HJ Open',
            'HJ vs BTN 3-bet': 'HJ Open',
            'HJ vs SB 3-bet': 'HJ Open',
            'HJ vs BB 3-bet': 'HJ Open',
            'CO vs BTN 3-bet': 'CO Open',
            'CO vs SB 3-bet': 'CO Open',
            'CO vs BB 3-bet': 'CO Open',
            'BTN vs SB 3-bet': 'BTN Open',
            'BTN vs BB 3-bet': 'BTN Open',
          }
  
          for (let successor in predecessorConnections) {
            const predecessor = await prisma.range.findFirst({
              where: {
                folder: {
                  userId: newUser.id
                },
                name: predecessorConnections[successor]
              },
              select: {
                id: true
              }
            })
  
            await prisma.range.updateMany({
              where: {
                folder: {
                  userId: newUser.id
                },
                name: successor
              },
              data: {
                predecessorId: predecessor.id
              }
            })
          }

          setSessionCookie(res, newUser.session.token)
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
