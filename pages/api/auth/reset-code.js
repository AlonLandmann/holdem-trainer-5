import { sendPasswordResetCode } from "@/lib/email";
import prisma from "@/lib/prisma";
import messages from "@/lib/messages";
import { generateSixDigitToken } from "@/lib/tokens";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.body.email) {
    return res.status(400).json({ success: false, message: messages.missingFormData });
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!user) {
    return res.status(400).json({ success: false, message: messages.userNotFound });
  }

  try {
    user = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        passwordResetCode: generateSixDigitToken(),
      },
      select: {
        email: true,
        passwordResetCode: true,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  sendPasswordResetCode(user.email, user.passwordResetCode);

  return res.status(200).json({ success: true });
};
