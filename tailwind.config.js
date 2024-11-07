/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          "1": "#ba6742",
          "2": "#ad8767",
          "3": "#dbbda5",
          "4": '#E8E4FF',
          "5": '#B0A4FD',
          success: "#42b968",
          info: "#8cc5ff",
          error: "#fcaea4"
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}

