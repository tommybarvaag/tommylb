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
    common: { black: "rgb(38, 50, 56)", white: "rgb(236, 239, 241)" },
    background: { paper: "rgb(38, 50, 56)", default: "rgb(38, 50, 56)" },
    primary: {
      light: "rgb(207, 216, 220)",
      main: "rgb(96, 125, 139)",
      dark: "rgb(55, 71, 79)",
      contrastText: "rgb(255, 255, 255)"
    },
    secondary: {
      light: "rgb(209, 196, 233)",
      main: "rgb(103, 58, 183)",
      dark: "rgb(49, 27, 146)",
      contrastText: "rgb(255, 255, 255)"
    },
    error: {
      light: "rgb(229, 115, 115)",
      main: "rgb(244, 67, 54)",
      dark: "rgb(211, 47, 47)",
      contrastText: "rgb(255, 255, 255)"
    },
    text: { primary: "rgb(236, 239, 241)", secondary: "rgb(144, 164, 174)" }
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: "rgb(236, 239, 241)"
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "rgb(236, 239, 241)"
      }
    }
  }
});

export default responsiveFontSizes(theme);
