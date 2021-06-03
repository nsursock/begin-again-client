module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    rotate: {
      "-180": "-180deg",
      "-120": "-120deg",
      "-90": "-90deg",
      "-45": "-45deg",
      "0": "0",
      "45": "45deg",
      "90": "90deg",
      "120": "120deg",
      "135": "135deg",
      "180": "180deg",
      "270": "270deg",
    },
    opacity: {
      "0": "0",
      "25": ".25",
      "50": ".5",
      "75": ".75",
      "10": ".1",
      "20": ".2",
      "30": ".3",
      "40": ".4",
      "50": ".5",
      "60": ".6",
      "70": ".7",
      "80": ".8",
      "90": ".9",
      "100": "1",
    },
    maxHeight: {
      "0": "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      "4/5": "80%",
      full: "100%",
    },
    extend: {
      transitionDuration: {
        "0": "0ms",
        "400": "400ms",
        "2000": "2000ms",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["first", "last"],
      borderWidth: ["responsive", "hover", "focus", "active", "disabled"],
      borderColor: ["responsive", "hover", "focus", "active", "disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
