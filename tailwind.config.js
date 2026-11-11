/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          maroon: "#4a0101",
          "maroon-deep": "#2a0000",
          "maroon-light": "#6b0202",
          gold: "#cda757",
          "gold-light": "#dfc384",
          "gold-pale": "#f9f4e8",
          cream: "#ffffff",
          white: "#ffffff",
        },
      },
      fontFamily: {
        inria: ["var(--font-inria)", "'Inria Serif'", "Georgia", "serif"],
        title: ["var(--font-inria)", "'Inria Serif'", "Georgia", "serif"],
        nunito: ["var(--font-nunito)", "'Nunito'", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "'Nunito'", "system-ui", "sans-serif"],
        cinzel: ["var(--font-inria)", "'Inria Serif'", "Georgia", "serif"],
        cormorant: ["var(--font-nunito)", "'Nunito'", "system-ui", "sans-serif"],
      },
      animation: {
        "ken-burns": "kenBurns 8s ease-in-out infinite alternate",
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        goldShimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "royal-gradient":
          "linear-gradient(135deg, #4a0101 0%, #6b0202 50%, #4a0101 100%)",
        "gold-gradient": "linear-gradient(90deg, #cda757, #dfc384, #cda757)",
      },
    },
  },
  plugins: [],
};
