import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: ['"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "4.8rem"
    },
    h2: {
      fontSize: "3.6rem"
    },
    h3: {
      fontSize: "2rem"
    },
    h4: {
      fontSize: "1.8rem"
    },
    h5: {
      fontSize: "1.6rem"
    }
  },
  palette: {
    common: { black: "rgba(38, 50, 56, 1)", white: "rgba(236, 239, 241, 1)" },
    background: { paper: "rgba(38, 50, 56, 1)", default: "rgba(38, 50, 56, 1)" },
    primary: { light: "rgba(207, 216, 220, 1)", main: "rgba(96, 125, 139, 1)", dark: "rgba(38, 50, 56, 1)", contrastText: "#fff" },
    secondary: { light: "rgba(209, 196, 233, 1)", main: "rgba(103, 58, 183, 1)", dark: "rgba(49, 27, 146, 1)", contrastText: "#fff" },
    error: { light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff" },
    text: { primary: "rgba(236, 239, 241, 1)", secondary: "rgba(0, 0, 0, 0.54)" }
  }
});

export default responsiveFontSizes(theme);
