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
          light: "#DBFBCC",
          DEFAULT: "#57853F",
          dark: "#476538",
        },
        secondary: "#d00b36",
        back: "#F8FCF5",
        font: "#D1CFCF",
      },
    },
  },
};