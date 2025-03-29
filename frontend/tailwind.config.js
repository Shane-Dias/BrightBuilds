/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        delius: ["Delius", "sans-serif"],
        boldonse: ["Boldonse", "sans-serif"],
        lilita: ["Lilita One", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        smooch: ["Smooch Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}