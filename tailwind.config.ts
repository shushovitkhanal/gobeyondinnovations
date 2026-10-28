import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#081222", cobalt: "#1359f4", mist: "#eaf2ff", slate: "#516174" },
      fontFamily: { display: ["Manrope", "Avenir Next", "Segoe UI", "sans-serif"], mono: ["SFMono-Regular", "Consolas", "monospace"] },
      boxShadow: { float: "0 20px 50px rgba(8, 18, 34, .13)" },
    },
  },
  plugins: [],
} satisfies Config;
