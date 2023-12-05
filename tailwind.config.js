const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./layouts/**/*.tsx"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%"
      },
      animation: {
        background: "background ease infinite"
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      zIndex: {
        60: "60"
      }
    }
  },
  variants: {
    typography: ["dark"]
  },
  plugins: [require("tailwindcss-animate")]
};
