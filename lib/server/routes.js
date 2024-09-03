import prisma from '@/lib/server/prisma'
import { produce } from 'immer'
import { toClientFormat } from './ranges'

export default async function handleUserRequest(req, res, method, f) {
  try {
    if (req.method !== method) {
      return res.status(400).json({ sucess: false, message: 'Invalid request.' })
    }

    const { sessionId } = req.cookies

    let user = await prisma.user.findFirst({
      where: {
        session: {
          is: {
            token: sessionId
          }
        }
      },
      include: {
        settings: true,
        folders: {
          include: {
            ranges: true
          }
        }
      }
    })

    if (!user) {
      return res.status(400).json({ success: false, message: 'Unauthorized request.' })
    }

    const success = await f(prisma, user)

    if (!success) {
      return res.status(500).json({ success: false, message: 'Something went wrong.' })
    }

    user = await prisma.user.findFirst({
      where: {
        session: {
          is: {
            token: sessionId
          }
        }
      },
      include: {
        settings: true,
        folders: {
          include: {
            ranges: {
              orderBy: {
                index: 'asc'
              }
            }
          },
          orderBy: {
            index: 'asc'
          }
        }
      }
    })

    user.folders = user.folders.map(produce(folderDraft => {
      folderDraft.ranges = folderDraft.ranges.map(r => toClientFormat(r))
    }))

    user.hasRanges = user.folders.reduce((acc, curr) => (
      acc || curr.ranges.length
    ), false)

    user.nrRanges = user.folders.reduce((acc, curr) => (
      acc + curr.ranges.length
    ), 0)

    return res.status(200).json({ success: true, updatedUser: user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}