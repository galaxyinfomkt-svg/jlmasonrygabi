/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1C1C1C",
          gold: "#C9963B",
          "gold-light": "#E0B864",
          "gold-deep": "#9C7426",
          light: "#F5F5F0",
          gray: "#4A4A4A",
          stone: "#2E2E2E",
          "stone-2": "#353331",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 14px 36px -10px rgba(201, 150, 59, 0.45)",
        "gold-sm": "0 4px 12px -4px rgba(201, 150, 59, 0.4)",
        warm: "0 18px 40px rgba(28, 22, 12, 0.18)",
        "card-dark":
          "0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 14px 30px rgba(0, 0, 0, 0.35)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        kenburns: "kenburns 22s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%, 100%": { transform: "scale(1.08) translate(0, 0)" },
          "50%": { transform: "scale(1.14) translate(-1.5%, -1.5%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(201, 150, 59, 0.55)" },
          "100%": { boxShadow: "0 0 0 18px rgba(201, 150, 59, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
