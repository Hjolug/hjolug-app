/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["AllianceNo2", "sans-serif"],
    },
    extend: {
      fontSize: {
        xs: ["0.6rem", "1.125rem"],
        sm: ["0.8rem", "1.25rem"],
        md: ["0.9rem", "1rem"],
        lg: ["1rem", "1.75rem"],
        xl: ["1.125rem", "1.4rem"],
        xxl: ["1.5rem", "1.875rem"],
        xxxl: ["2rem", "2.1rem"],
        xxxxl: ["2.75rem", "2.95rem"],
        xxxxxl: ["4.75rem", "4.45rem"],

        "display-xs": [
          "1.125rem",
          {
            lineHeight: "1.7rem",
            letterSpacing: "-0.01em",
          },
        ],
        "display-sm": ["2.625rem", "2.375rem"],
        "display-md": [
          "3.25rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.05em",
          },
        ],
        "display-lg": [
          "4.1875rem",
          {
            lineHeight: "4rem",
            letterSpacing: "-0.05em",
          },
        ],
        "display-xl": [
          "5rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.04em",
            fontWeight: 500,
          },
        ],
        "display-2xl": [
          "7rem",
          {
            lineHeight: "6.25rem",
            letterSpacing: "-0.02rem",
            fontWeight: 500,
          },
        ],
        "display-3xl": [
          "20rem",
          {
            lineHeight: "18rem",
            letterSpacing: "-0.02rem",
            fontWeight: 500,
          },
        ],
      },
      colors: {
        orange: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#FF6941",
          900: "#FF4F20",
        },
        johan: {
          25: "#FF5666",
          50: "#FF5666",
          100: "#FF5666",
          200: "#FFDDE0",
          300: "#FF5666",
          400: "#FF5666",
          500: "#FF5666",
          600: "#FF5666",
          700: "#FF5666",
          800: "#FF5666",
          900: "#FF5666",
        },
        petter: {
          25: "#BBDCEF",
          50: "#BBDCEF",
          100: "#BBDCEF",
          200: "#BBDCEF",
          300: "#BBDCEF",
          400: "#BBDCEF",
          500: "#BBDCEF",
          600: "#BBDCEF",
          700: "#BBDCEF",
          800: "#BBDCEF",
          900: "#BBDCEF",
        },
        black: "#000000",
        "black-80": "rgba(0,0,0,0.8)",
        "black-60": "rgba(0,0,0,0.6)",
        "black-50": "rgba(0,0,0,0.05)",
        "black-40": "rgba(0,0,0,0.04)",
        "black-10": "rgba(0,0,0,0.1)",
        "neon-yellow": "#FEF351",
      },
    },
  },
  ins: [],
};
