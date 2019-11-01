import { red } from "@material-ui/core/colors";
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
      main: "#000"
    },
    secondary: {
      main: "#27242c"
    },
    error: {
      main: red["A400"]
    },
    background: {
      default: "#fff"
    }
  }
});

export default responsiveFontSizes(theme);
