import messages from "@/lib/messages";
import prisma from "@/lib/prisma";

// NOT SECURED

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  if (!req.query.userId) {
    return res.status(400).json({ success: false, messages: messages.missingQueryData });
  }

  let folders;

  try {
    folders = await prisma.folder.findMany({
      where: {
        userId: Number(req.query.userId),
      },
      include: {
        ranges: {
          select: {
            id: true,
            index: true,
            name: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
      orderBy: {
        index: "asc",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, messages: messages.internalServerError });
  }

  if (!folders) {
    return res.status(500).json({ success: false, message: "Folders not found." });
  }
  
  return res.status(200).json({ success: true, folders: folders });
};
