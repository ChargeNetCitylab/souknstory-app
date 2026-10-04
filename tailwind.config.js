/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original app palette (Ask, Stories, Explore, business portal)
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
        // Journeys website palette
        night: "#12161D",
        nightLine: "#2B313B",
        ivory: "#F5F0E6",
        gold: "#C9A45C",
        brass: "#7A5A1C",
        stone: "#545A63",
        mist: "#C9C3B6",
        line: "#DDD3C2",
        field: "#C9BFAD",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};
