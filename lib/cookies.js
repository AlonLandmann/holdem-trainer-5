export function setSessionCookie(res, token) {
  res.setHeader('Set-Cookie', `sessionId=${token}; HttpOnly; SameSite=Strict; Max-Age=8640000`)
}

export function removeSessionCookie(res) {
  res.setHeader('Set-Cookie', `sessionId=; HttpOnly; SameSite=Strict; Max-Age=0`)
}