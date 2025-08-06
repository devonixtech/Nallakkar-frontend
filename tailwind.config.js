/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a214c',    // Dark navy
        pinkLight: '#f1bed8',  // Light pink
        pink: '#e06ba6',       // Medium pink
        rose: '#ec3557', 
        darkpink:'#d2267c'      // Reddish rose
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


