import prisma from "@/lib/prisma";
import { toStorageFormat } from "@/lib/ranges";
import messages from "@/lib/messages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.cookies.holdemTrainerSessionId) {
    return res.status(401).json({ success: false, message: messages.noSessionDetected });
  }

  if (
    typeof req.body.name !== "string" ||
    typeof req.body.stacks !== "object" ||
    typeof req.body.history !== "object" ||
    typeof req.body.options !== "object" ||
    typeof req.body.matrix !== "object" ||
    typeof req.body.complexity !== "number" ||
    typeof req.body.folderId !== "number"
  ) {
    return res.status(400).json({ success: false, message: messages.missingFormData });
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        sessionCookie: req.cookies.holdemTrainerSessionId,
      },
      include: {
        folders: {
          include: {
            ranges: true,
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

  let range;

  try {
    range = toStorageFormat(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: messages.corruptedInput });
  }

  try {
    await prisma.range.create({
      data: {
        index: user.folders.find(f => f.id === range.folderId).ranges.length,
        name: `${range.name} (copy)`,
        stacks: range.stacks,
        history: range.history,
        options: range.options,
        matrix: range.matrix,
        complexity: range.complexity,
        folderId: range.folderId,
        predecessorId: range.predecessorId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  return res.status(201).json({ success: true });
};
