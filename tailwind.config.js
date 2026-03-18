/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        cream: '#F4EFE6',
        ink: '#141210',
        gold: '#3B82F6',
        'gold-light': '#93C5FD',
        muted: '#7A7269',
        surface: '#EDEAE3',
      },
    },
  },
  plugins: [],
}
