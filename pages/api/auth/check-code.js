import prisma from "@/lib/prisma";
import messages from "@/lib/messages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.body.email || !req.body.codeInput) {
    return res.status(400).json({ success: false, message: messages.missingFormData });
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        passwordResetCode: true,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!user) {
    return res.status(401).json({ success: false, message: messages.userNotFound });
  }

  if (req.body.codeInput !== user.passwordResetCode) {
    return res.status(400).json({ success: false, message: "The code entered is either incorrect or no longer valid." });
  }

  try {
    user = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        passwordResetCode: null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(200).json({ success: true });
};
