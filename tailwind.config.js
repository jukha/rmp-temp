/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#004080", // Dark Blue
        accent: "#0099cc", // Deep Sky Blue
        background: "#f5f5f5", // Light Gray
        text: "#333333", // Dark Gray
        highlight: "#ff6600", // Orange
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
