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
          // Base palette pulled from the JL Masonry logo (red bricks + black)
          dark: "#0F0F0F", // near-black background
          stone: "#1a1a1a", // alternate dark surface
          "stone-2": "#262626",
          light: "#FAFAF7", // off-white for text on dark
          gray: "#4A4A4A",
          // Brand red (brick red from the logo bricks)
          red: "#C13A35",
          "red-light": "#DC4640",
          "red-deep": "#8B2724",
          "red-pale": "#F4D6D4",
          // Legacy gold aliases mapped to red for compatibility — keeps all
          // existing `brand-gold`, `text-brand-gold`, `border-brand-gold/40`,
          // `bg-brand-gold/15`, etc. working without per-file find/replace.
          gold: "#C13A35",
          "gold-light": "#DC4640",
          "gold-deep": "#8B2724",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 14px 36px -10px rgba(193, 58, 53, 0.55)",
        "gold-sm": "0 4px 12px -4px rgba(193, 58, 53, 0.45)",
        red: "0 14px 36px -10px rgba(193, 58, 53, 0.55)",
        "red-sm": "0 4px 12px -4px rgba(193, 58, 53, 0.45)",
        warm: "0 18px 40px rgba(15, 15, 15, 0.22)",
        "card-dark":
          "0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 14px 30px rgba(0, 0, 0, 0.45)",
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
          "0%": { boxShadow: "0 0 0 0 rgba(193, 58, 53, 0.55)" },
          "100%": { boxShadow: "0 0 0 18px rgba(193, 58, 53, 0)" },
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
