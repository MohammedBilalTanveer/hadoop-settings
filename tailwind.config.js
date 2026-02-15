/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ubuntu: {
          dark: '#2a2a2a',
          darker: '#1a1a1a',
          orange: '#dd4814',
          light: '#f5f5f5',
        }
      }
    },
  },
  plugins: [],
}
