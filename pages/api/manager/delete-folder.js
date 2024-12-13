import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function hanlder(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.cookies.holdemTrainerSessionId) {
    return res.status(401).json({ success: false, message: messages.noSessionDetected });
  }

  if (!req.query.folderId || !req.query.folderIndex) {
    return res.status(400).json({ success: false, message: "Missing query data." });
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        sessionCookie: req.cookies.holdemTrainerSessionId,
      },
      select: {
        id: true,
        folders: {
          select: {
            id: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!user) {
    return res.status(401).json({ success: false, message: messages.userNotFound });
  }

  if (!(user.folders.map(f => f.id).includes(Number(req.query.folderId)))) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  try {
    await prisma.$transaction([
      prisma.folder.delete({
        where: {
          id: Number(req.query.folderId),
          userId: user.id,
        },
      }),
      prisma.folder.updateMany({
        where: {
          userId: user.id,
          index: {
            gt: Number(req.query.folderIndex),
          },
        },
        data: {
          index: {
            decrement: 1,
          },
        },
      }),
    ]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(200).json({ success: true });
};
