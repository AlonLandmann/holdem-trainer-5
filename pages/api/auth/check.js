import prisma from "@/lib/prisma";
import { toClientFormat } from "@/lib/ranges";
import messages from "@/lib/messages";
import { produce } from "immer";

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function hanlder(req, res) {
  if (req.method !== "GET") {
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
        settings: true,
        trainingSessions: {
          include: {
            trainingUnits: true,
          },
        },
        folders: {
          include: {
            ranges: {
              orderBy: {
                index: "asc",
              },
              include: {
                successors: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: messages.internalServerError });
  }

  if (!user) {
    return res.status(400).json({ success: false, message: messages.userNotFound });
  }

  user.folders = user.folders.map(produce(folderDraft => {
    folderDraft.ranges = folderDraft.ranges.map(r => toClientFormat(r));
  }));

  return res.status(200).json({ success: true, user: user });
};
