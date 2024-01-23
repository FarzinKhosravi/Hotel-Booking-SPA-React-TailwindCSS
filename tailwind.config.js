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
        7.5: "30px",
        18: "4.5rem",
      },

      gap: {
        2.5: "10px",
      },

      padding: {
        6.88: "27.5px",
        34: "8.5rem",
        2.5: "10px",
        3.5: "14px",
      },

      maxWidth: {
        64: "256px",
        55: "220px",
      },

      zIndex: {
        1000: "1000",
        2000: "2000",
      },

      margin: {
        0.5: "2px",
        1.6: "0.4rem",
      },

      translate: {
        0.25: "1px",
        2.25: "9px",
        3.75: "15px",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms"),
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
