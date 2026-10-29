import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0d0d0c",
          dark: "#080807",
          surface: "#141310",
          card: "#1a1814",
          cardElevated: "#211e19",
          border: "#2c2923",
          borderLight: "rgba(255, 255, 255, 0.12)",
        },
        gold: {
          light: "#ecd095",
          DEFAULT: "#c6a15b",
          hover: "#d4af65",
          deep: "#9e7d3b",
          glow: "rgba(198, 161, 91, 0.18)",
        },
        paper: {
          DEFAULT: "#f2eee5",
          muted: "#aaa49a",
          subtle: "#7d776d",
          light: "#faf8f4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      borderRadius: {
        luxury: "18px",
        pill: "9999px",
      },
      boxShadow: {
        goldGlow: "0 0 35px -5px rgba(198, 161, 91, 0.25)",
        luxuryCard: "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

