/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("kutty")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#1e6f44", // For lighter primary color
          DEFAULT: "#106136", // Normal primary color
          dark: "#13472c", // Used for hover, active, etc.
        },
        secondary: {
          light: "#de3459", // For lighter primary color
          DEFAULT: "#d00b36", // Normal primary color
          dark: "#971934", // Used for hover, active, etc.
        },
      },
    },
  },
  
};
