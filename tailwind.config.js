/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Red Hat Display', 'sans-serif'],
        decorative: ['Amita', 'cursive'],
      },
      borderColor: {
        DEFAULT: 'rgb(38, 38, 38)', // Set your default border color here
      },
    },
  },
  plugins: [],
}

