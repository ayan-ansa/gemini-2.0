/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        media960: "960px",
      },
      keyframes: {
        loader: {
          "0%": { backgroundPosition: "-800px 0px" },
          "100%": { backgroundPosition: "800px 0px" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        loader: "loader 2s linear infinite",
        "fade-in": "fadeIn 1s linear",
      },
    },
  },
  plugins: [],
};
