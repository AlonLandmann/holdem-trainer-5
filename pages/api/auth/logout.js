import messages from "@/lib/messages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: messages.invalidRequestMethod });
  }

  res.setHeader("Set-Cookie", "holdemTrainerSessionId=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");

  return res.status(200).json({ success: true });
};