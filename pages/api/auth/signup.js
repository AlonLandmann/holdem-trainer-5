import { setSessionCookie } from '@/lib/cookies'
import { sendVerificationLink } from '@/lib/email'
import prisma from '@/lib/prisma'
import { generateUsername } from '@/lib/usernames'
import { last } from 'lodash'
import sha256 from 'sha256'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { email, password } = req.body

        if (await prisma.user.findUnique({ where: { email } })) {
          return res.status(200).json({ success: false, message: 'User already exists.' })
        }

        let userNameCandidate = generateUsername()

        const conflictingUsers = await prisma.user.findMany({
          where: {
            username: {
              startsWith: userNameCandidate
            }
          },
          select: {
            username: true
          }
        })

        const conflictingEndings = conflictingUsers.map(u => Number(u.username.slice(userNameCandidate.length)))
        
        if (conflictingEndings.length) {
          userNameCandidate = `${userNameCandidate} ${String(last(conflictingEndings) + 1)}`
        }

        const newUser = await prisma.user.create({
          data: {
            email,
            username: userNameCandidate,
            hash: sha256(password),
            session: { create: {} },
            settings: { create: {} },
          },
          include: {
            session: true
          }
        })

        setSessionCookie(res, newUser.session.token)
        sendVerificationLink(newUser.email, newUser.verificationToken)

        return res.status(200).json({ success: true })

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}