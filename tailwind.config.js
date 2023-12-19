/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        129: "129deg",
        50: "50deg",
      },

      backgroundImage: {
        "img-home": "url('./src/assets/images/img-home.svg')",
      },

      fontFamily: {
        Parisienne: ["Parisienne", "sans-serif"],
        Rasa: ["Rasa", "sans-serif"],
      },

      inset: {
        22: "5.5rem",
      },

      translate: {
        0.25: "1px",
        2.25: "9px",
        3.75: "15px",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
