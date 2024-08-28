import { setSessionCookie } from '@/lib/cookies'
import { getGoogleUserInfo } from '@/lib/google'
import prisma from '@/prisma/client'

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

          const updatedUser = await prisma.user.update({
            where: {
              id: foundByIdUser.id
            },
            data: {
              session: {
                create: {}
              }
            },
            include: {
              session: true
            }
          })

          setSessionCookie(res, updatedUser.session.token)
        } else {
          const foundByEmailUser = await prisma.user.findUnique({
            where: {
              email
            }
          })

          if (foundByEmailUser) {
            return res.redirect('/login?googleAuth=fail')
          }

          const newUser = await prisma.user.create({
            data: {
              email,
              username: name,
              googleId: id,
              session: { create: {} },
              settings: { create: {} },
              isVerified: true,
            },
            include: {
              session: true
            }
          })

          setSessionCookie(res, newUser.session.token)
        }

        return res.redirect('/')

      default:
        res.redirect('/login?googleAuth=fail')
    }
  } catch (error) {
    console.log(error)
    res.redirect('/login?googleAuth=fail')
  }
}
