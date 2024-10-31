import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'
import { produce } from 'immer'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { sessionId } = req.cookies

        console.log(sessionId)

        const user = await prisma.user.findFirst({
          where: {
            session: {
              is: {
                token: sessionId || null
              }
            }
          },
          include: {
            settings: true,
            trainingSessions: {
              include: {
                trainingUnits: true
              }
            },
            folders: {
              include: {
                ranges: {
                  orderBy: {
                    index: 'asc'
                  },
                  include: {
                    successors: {
                      select: {
                        id: true,
                        name: true,
                      }
                    }
                  }
                }
              },
              orderBy: {
                index: 'asc'
              }
            }
          }
        })

        console.log(Boolean(user))

        if (!user) {
          return res.status(200).json({ success: false })
        }

        user.folders = user.folders.map(produce(folderDraft => {
          folderDraft.ranges = folderDraft.ranges.map(r => toClientFormat(r))
        }))

        return res.status(200).json({ success: true, user })

      default:
        res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}