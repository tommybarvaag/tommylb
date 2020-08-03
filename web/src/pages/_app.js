import { ThemeProvider } from "@emotion/react";
import * as React from "react";
import Layout from "../containers/layout";
import { theme } from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
