export function validateUrl(url) {
  const urlRegex = /^https:\/\/images\.unsplash\.com\//i
  return urlRegex.test(url)
}

export function validateEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

export function validatePassword(password) {
  return password.length >= 8 && password.length <= 200 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)
}