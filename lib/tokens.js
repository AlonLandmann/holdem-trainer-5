export function generateSixDigitToken() {
  let token = "";

  for (let i = 0; i < 6; i++) {
    token += String(Math.floor(Math.random() * 10));
  }

  return token;
};