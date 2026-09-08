import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        obsidian: "#030712",

        surface: "#0B1117",

        surface2: "#0F1720",

        cyan: "#38BDF8",

        indigo: "#818CF8",

        borderTerminal: "#1F2937",

        mint: "#34D399",

        amber: "#FBBF24",

        rose: "#FB7185",

        primaryText: "#F8FAFC",

        secondaryText: "#94A3B8",
      },

      boxShadow: {
        cyanGlow:
          "0 0 24px rgba(56,189,248,.12)",

        terminal:
          "0 20px 60px rgba(0,0,0,.35)",
      },
    },
  },

  plugins: [],
};

export default config;