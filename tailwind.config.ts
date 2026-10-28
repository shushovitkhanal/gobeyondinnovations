import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#070b14", cobalt: "#1d5dff", mist: "#f7faff", slate: "#526175" },
      fontFamily: {
        display: ["Manrope", "Avenir Next", "Segoe UI", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["DM Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      boxShadow: { float: "0 16px 40px rgba(31, 58, 98, .09)" },
    },
  },
  plugins: [],
} satisfies Config;
