/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Replace with your primary color
        "primary-light": "#93c5fd", // Light variant
        "primary-dark": "#1e40af", // Dark variant
      },
    },
  },
  plugins: [],
}

