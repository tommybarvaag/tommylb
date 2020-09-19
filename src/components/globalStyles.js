import { Global } from "@emotion/core";
import * as React from "react";

export default function GlobalStyles() {
  return (
    <Global
      styles={theme => ({
        html: {
          scrollBehavior: "smooth"
        },
        "#__next": {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }
      })}
    />
  );
}
