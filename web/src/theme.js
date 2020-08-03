const breakpoints = ["376px", "608px", "1024px", "1504px"];

// breakpoints.xs = breakpoints[0];
// breakpoints.s = breakpoints[1];
// breakpoints.m = breakpoints[2];
// breakpoints.l = breakpoints[3];

// https://noeldelgado.github.io/shadowlord/#000000

const colors = {
  bg100: "#666666",
  bg200: "#4d4d4d",
  bg300: "#333333",
  bg400: "#191919",
  bg500: "#000000",
  text100: "#999999",
  text200: "#b3b3b3",
  text300: "#cccccc",
  text400: "#e6e6e6",
  text500: "#ffffff",

  main: "#ffffff",
  link: "#1e90ff",
  text: "#ffffff",
  borders: {
    default: "rgba(255, 255, 255, 0.8)"
  }
};

export const theme = {
  breakpoints,
  colors,
  sizes: {
    0: 0,
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem",
    auto: "auto",
    px: "0.01rem",
    full: "100%",
    screen: "100vh"
  },
  space: [
    0,
    "0.8rem",
    "1.6rem",
    "2.4rem",
    "3.2rem",
    "4rem",
    "4.8rem",
    "5.6rem",
    "6.4rem",
    "7.2rem",
    "8rem",
    "9.6rem",
    "12rem",
    "14rem",
    "18rem",
    "20rem",
    "30rem"
  ],
  fontSizes: [
    "1.2rem",
    "1.4rem",
    "1.6rem",
    "1.8rem",
    "2rem",
    "2.4rem",
    "3.2rem",
    "4.8rem",
    "5.6rem",
    "6.4rem",
    "7.2rem",
    "9.6rem",
    "12rem"
  ],
  fontWeights: ["lighter", "normal", "bold"],
  lineHeights: [
    "2rem",
    "2.4rem",
    "2.8rem",
    "3.2rem",
    "4rem",
    "6rem",
    "7.2rem",
    "8rem",
    "10rem",
    "12rem"
  ],
  fonts: {
    default: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Arial", sans-serif`
  },
  borders: [0, `1px solid ${colors.main}`],
  radii: ["0.4rem", "0.8rem", "1.6rem", "3.2rem", "50%"]
};

export default {
  breakpoints
};
