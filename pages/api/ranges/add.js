import prisma from '@/lib/server/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const { sessionId } = req.cookies

        const session = await prisma.session.findUnique({
          where: {
            token: sessionId,
          },
          include: {
            user: {
              include: {
                folders: true,
              },
            },
          },
        })

        if (!session) {
          return res.status(200).json({ success: false, message: 'User not found.' })
        }

        const user = session.user

        let folder = await prisma.folder.findFirst({
          where: {
            name: 'New Folder',
            userId: user.id,
          },
        })

        if (!folder) {
          const folderIndex = user.folders.length

          folder = await prisma.folder.create({
            data: {
              name: 'New Folder',
              index: folderIndex,
              user: {
                connect: { id: user.id },
              },
            },
          })
        }

        const newRange = await prisma.range.create({
          data: {
            name: 'New Range',
            matrix: Buffer.from([1, 2, 3, 4]), // CORRECT BUFFER
            // ADD HISTORY
            // ADD OPTIONS
            folder: {
              connect: { id: folder.id },
            },
          },
        })

        return res.status(200).json({ success: true, range: newRange })

      default:
        res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}