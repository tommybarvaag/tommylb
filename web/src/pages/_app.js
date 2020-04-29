import App from "next/app";
import React from "react";
import "../styles/base.css";
import withMuiThemeProvider from "../withMuiThemeProvider";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default withMuiThemeProvider(MyApp);
