import prisma from "@/lib/prisma";
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

  try {
    await prisma.folder.create({
      data: {
        index: user.folders.length,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(201).json({ success: true });
};
