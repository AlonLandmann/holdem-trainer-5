import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.body.username) {
    return res.status(400).json({ success: false, message: messages.missingFormData });
  }

  if (!req.cookies.holdemTrainerSessionId) {
    return res.status(401).json({ success: false, message: messages.noSessionDetected });
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (user) {
    return res.status(409).json({ success: false, message: "Username already exists." });
  }

  try {
    user = await prisma.user.findUnique({
      where: {
        sessionCookie: req.cookies.holdemTrainerSessionId,
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
    user = await prisma.user.update({
      where: {
        sessionCookie: req.cookies.holdemTrainerSessionId,
      },
      data: {
        username: req.body.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(200).json({ success: true });
};
