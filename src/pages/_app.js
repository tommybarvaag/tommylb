import * as React from "react";
import { ThemeProvider } from "theme-ui";
import customComponents from "../components/mdx/customComponents";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme} components={customComponents}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
