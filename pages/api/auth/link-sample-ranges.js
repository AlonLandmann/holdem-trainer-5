import prisma from '@/lib/prisma'

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
};

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'PATCH':
        // for (let successor in predecessorConnections) {
        //   const predecessor = await prisma.range.findFirst({
        //     where: {
        //       folder: {
        //         userId: newUser.id
        //       },
        //       name: predecessorConnections[successor]
        //     },
        //     select: {
        //       id: true
        //     }
        //   });

        //   await prisma.range.updateMany({
        //     where: {
        //       folder: {
        //         userId: newUser.id
        //       },
        //       name: successor
        //     },
        //     data: {
        //       predecessorId: predecessor.id
        //     }
        //   });
        // }

      default:
        res.status(400).json({ success: false, message: 'Invalid request.' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}
