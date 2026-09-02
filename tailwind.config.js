/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#163329",
        forestLight: "#1F4A3A",
        cream: "#FBF8F1",
        creamCard: "#F6F1E6",
        sand: "#D9C49B",
        sandLight: "#EFE3C8",
        terracotta: "#BE5B3B",
        terracottaLight: "#F0DACD",
        charcoal: "#221E1B",
        ink: "#1B1815",
        muted: "#8A7B5E",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};
