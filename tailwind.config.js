/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#073567',
        background: '#E9F1FA',
        secondary: '#D1D600',
        'card-1': 'rgba(255, 255, 255, 0.1)',
        'card-2': 'rgba(255, 255, 255, 0.2)',
        'card-3': 'rgba(255, 255, 255, 0.3)',
        white: '#FFFEFF',
      },
    },
  },
  plugins: [],
} 