/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
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
         sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
         poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


