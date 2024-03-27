/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      rotate: {
        129: "129deg",
        50: "50deg",
      },

      backgroundImage: {
        "img-home": "url('./src/assets/images/img-home.png')",
      },

      fontFamily: {
        Parisienne: ["Parisienne", "sans-serif"],
        Rasa: ["Rasa", "sans-serif"],
      },

      fontSize: {
        5.5: "22px",
        8: "32px",
      },

      borderRadius: {
        0.5: "2px",
        5: "20px",
        6.25: "25px",
      },

      inset: {
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        7.5: "30px",
        18: "4.5rem",
        1.25: "5px",
        2.5: "10px",
        2.75: "11px",
        7.25: "29px",
        3.5: "14px",
        "35%": "35%",
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
        0.25: "1px",
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
