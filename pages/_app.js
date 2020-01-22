import App from "next/app";
import React from "react";
import withMuiThemeProvider from "../src/withMuiThemeProvider";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default withMuiThemeProvider(MyApp);
