/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-theme)', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          border: 'var(--color-border)',
          card: 'var(--color-card-bg)',
          input: 'var(--color-input-bg)',
          muted: 'var(--color-muted-text)',
        }
      },
      fontSize: {
        '2xs': '0.625rem',   // 10px
        '3xs': '0.5625rem',  // 9px
        '4xs': '0.5rem',     // 8px
      }
    },
  },
  plugins: [],
}

