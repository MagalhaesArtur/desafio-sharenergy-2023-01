/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        image: "url('./assets/background.jpg')",
      },
    },
  },
  plugins: [],
};
