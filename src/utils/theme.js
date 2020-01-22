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
    primary: {
      light: "#000000",
      main: "#000000",
      dark: "#000000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#27242c",
      main: "#27242c",
      dark: "#27242c",
      contrastText: "#ffffff"
    },
    background: {
      default: "#ffffff"
    }
  }
});

export default responsiveFontSizes(theme);
