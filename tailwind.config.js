/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',   // 10px
        '3xs': '0.5625rem',  // 9px
        '4xs': '0.5rem',     // 8px
      }
    },
  },
  plugins: [],
}
