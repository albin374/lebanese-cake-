/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          main: '#FFF9F0',
          top: '#F8F1E6',
          nav: '#FFFFFF',
        },
        chocolate: {
          primary: '#4A2116',
          dark: '#30140D',
          light: '#6E3A2B',
        },
        gold: {
          accent: '#C58A19',
          light: '#E6C783',
          dark: '#A36F11',
        },
        burgundy: {
          accent: '#72251F',
          dark: '#541914',
        },
        border: {
          sand: '#F5EBDD',
        }
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        serif: ['CleanAmpersand', '"Playfair Display"', 'Georgia', 'serif'],
        arabic: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
