/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#000000",        // true black base
        secondary: "#0f0f0f",      // slightly elevated dark surface
        white: "#ffffff",          // clean white for text / elements

        accent: {
          400: "#60a5fa",         // light blue
          500: "#3b82f6",         // medium blue
          600: "#2563eb",         // strong primary blue
          "600/40": "rgba(37, 99, 235, 0.4)",  // transparent variant
          "600/50": "rgba(37, 99, 235, 0.5)",  // transparent variant
        },

        light: {
          100: "#f5f5f5",          // light backgrounds
          200: "#e5e5e5",          // muted borders / text
          300: "#cccccc"           // placeholder / subtle elements
        },

        dark: {
          100: "#1a1a1a",          // card surfaces
          200: "#121212",          // modal / nav backgrounds
        }
      },
    },
  },
  plugins: [],
}