import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2F5D3A",
        moss: "#6E8B3D",
        sand: "#D9C7A2",
        river: "#3E7EA8",
        volcanic: "#4E4E4E",
        mist: "#F4F7F1",
        canopy: "#123427"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(18, 52, 39, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
