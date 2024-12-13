import { getGoogleUserInfo } from "@/lib/google";
import prisma from "@/lib/prisma";
import sampleFolders from "@/prisma/sample-ranges.json";
import { v4 } from "uuid";

const folderCreateArray = sampleFolders.map(folder => ({
  index: folder.index,
  name: `${folder.name} (sample)`,
  ranges: {
    create: folder.ranges.map(range => ({
      index: range.index,
      name: range.name,
      stacks: range.stacks,
      history: range.history,
      options: range.options,
      matrix: Buffer.from(range.matrix),
      complexity: range.complexity,
    })),
  },
}));

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.redirect("/auth/login?googleAuth=fail");
  }

  let googleUserInfo;

  try {
    googleUserInfo = await getGoogleUserInfo(req);
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/login?googleAuth=fail");
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        googleId: googleUserInfo.id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/login?googleAuth=fail");
  }

  if (user) {
    try {
      user = await prisma.user.update({
        where: {
          googleId: googleUserInfo.id,
        },
        data: {
          sessionCookie: v4(),
        },
        select: {
          sessionCookie: true,
        }
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/auth/login?googleAuth=fail");
    }

    res.setHeader("Set-Cookie", `holdemTrainerSessionId=${user.sessionCookie}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);

    return res.redirect("/app/manager");
  }

  try {
    user = await prisma.user.findUnique({
      where: {
        email: googleUserInfo.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/login?googleAuth=fail");
  }

  if (user) {
    return res.redirect("/auth/login?googleAuth=fail");
  }

  try {
    user = await prisma.user.create({
      data: {
        email: googleUserInfo.email,
        username: googleUserInfo.name,
        googleId: googleUserInfo.id,
        isVerified: true,
        sessionCookie: v4(),
        settings: {
          create: {},
        },
        folders: {
          create: folderCreateArray,
        },
      },
      select: {
        sessionCookie: true,
      },
    })
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/login?googleAuth=fail");
  }

  res.setHeader("Set-Cookie", `holdemTrainerSessionId=${user.sessionCookie}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);

  return res.redirect("/app/manager");
};
