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
          DEFAULT: "#FCFBF8",
          dark: "#F7F1E7",
          surface: "#F7F1E7",
          card: "#F7F1E7",
          cardElevated: "#FCFBF8",
          border: "#e8dfd1",
          borderLight: "rgba(166, 124, 50, 0.15)",
        },
        gold: {
          light: "#d4b370",
          DEFAULT: "#a67c32",
          hover: "#8c6522",
          deep: "#6e4d12",
          glow: "rgba(166, 124, 50, 0.2)",
        },
        paper: {
          DEFAULT: "#221910",
          muted: "#665d52",
          subtle: "#857a6d",
          light: "#110b06",
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
        goldGlow: "0 4px 25px -2px rgba(166, 124, 50, 0.25)",
        luxuryCard: "0 10px 30px -10px rgba(50, 30, 10, 0.08)",
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
