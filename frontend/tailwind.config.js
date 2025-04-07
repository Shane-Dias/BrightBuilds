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
  plugins: [
    function({ addBase }) {
      addBase({
        'html, body': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(75, 85, 99, 0.8) transparent',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(75, 85, 99, 0.8)',
          borderRadius: '10px',
          boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.05)',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(107, 114, 128, 0.8)',
        },
      });
    }
  ],
}