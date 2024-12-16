import prisma from "@/lib/prisma";
import { defaultMatrixBuffer } from "@/lib/ranges";
import messages from "@/lib/messages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.cookies.holdemTrainerSessionId) {
    return res.status(401).json({ success: false, message: messages.noSessionDetected });
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        sessionCookie: req.cookies.holdemTrainerSessionId,
      },
      include: {
        folders: true,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!user) {
    return res.status(401).json({ success: false, message: messages.userNotFound });
  }

  let folder;

  try {
    if (req.query.folderId) {
      folder = await prisma.folder.findUnique({
        where: {
          id: Number(req.query.folderId),
        },
        include: {
          ranges: true,
        },
      });
    } else {
      folder = await prisma.folder.findFirst({
        where: {
          name: "New Folder",
          userId: user.id,
        },
        include: {
          ranges: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!folder) {
    try {
      folder = await prisma.folder.create({
        data: {
          index: user.folders.length,
          userId: user.id,
        },
        include: {
          ranges: true,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: messages.internalServerError });
    }
  }

  try {
    await prisma.range.create({
      data: {
        index: folder.ranges.length,
        matrix: defaultMatrixBuffer,
        folderId: folder.id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(200).json({ success: true, message: "Range added." });
};
