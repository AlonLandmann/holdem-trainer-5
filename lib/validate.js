export function validateUrl(url) {
  const urlRegex = /^https:\/\/images\.unsplash\.com\//i
  return urlRegex.test(url)
}
