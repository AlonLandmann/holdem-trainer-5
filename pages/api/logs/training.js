import prisma from '@/lib/server/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { userId, sessionId, rangeId, correct, complexity } = req.body

        let trainingSession = await prisma.trainingSession.findUnique({ where: { id: sessionId } })

        if (!trainingSession) {
          trainingSession = await prisma.trainingSession.create({
            data: {
              id: sessionId,
              user: { connect: { id: userId } }
            }
          })
        }

        let trainingUnit = await prisma.trainingUnit.findFirst({
          where: {
            rangeId,
            trainingSession: {
              id: sessionId
            }
          }
        })

        if (!trainingUnit) {
          await prisma.trainingUnit.create({
            data: {
              rangeId,
              trainingSessionId: sessionId,
              correct: Number(correct),
              total: 1,
              complexity,
              score: correct ? complexity : 0
            },
          })
        } else {
          await prisma.trainingUnit.updateMany({
            where: {
              rangeId,
              trainingSession: {
                id: sessionId
              }
            },
            data: {
              correct: {
                increment: Number(correct),
              },
              total: {
                increment: 1
              },
              score: {
                increment: correct ? complexity : 0
              }
            }
          })
        }

        return res.status(200).json({ success: true })

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}