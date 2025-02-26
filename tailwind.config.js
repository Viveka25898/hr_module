/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#123524", // Add your custom color
      },
      fontFamily: {
        bai: ["Bai Jamjuree", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
        rokkitt: ["Rokkitt", "serif"],
        tapestry: ["Tapestry", "cursive"],
      },
    },
  },
  plugins: [],
}

