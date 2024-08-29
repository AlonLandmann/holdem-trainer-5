import { setSessionCookie } from '@/lib/server/cookies'
import { getGoogleUserInfo } from '@/lib/server/google'
import prisma from '@/lib/server/prisma'

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

          const newUser = await prisma.user.create({
            data: {
              email,
              username: name,
              googleId: id,
              isVerified: true,
              session: { create: {} },
              settings: { create: {} },
            },
            include: {
              session: true
            }
          })

          setSessionCookie(res, newUser.session.token)
        }

        return res.redirect('/')

      default:
        res.redirect('/auth/login?googleAuth=fail')
    }
  } catch (error) {
    console.log(error)
    res.redirect('/auth/login?googleAuth=fail')
  }
}
