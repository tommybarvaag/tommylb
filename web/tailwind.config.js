const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")]
};
