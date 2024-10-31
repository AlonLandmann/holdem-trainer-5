import { serialize } from 'cookie'

export function setSessionCookie(res, token) {
  removeSessionCookie(res)

  res.setHeader('Set-Cookie', serialize('sessionId', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    path: '/',
  }))
}

export function removeSessionCookie(res) {
  res.setHeader('Set-Cookie', serialize('sessionId', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    path: '/',
  }))
}