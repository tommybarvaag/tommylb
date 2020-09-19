import * as React from "react";
import { Container } from "theme-ui";
import Copyright from "./copyright";

export default function Footer({ ...other }) {
  return (
    <Container as="footer" variant="footer" {...other}>
      <Container>
        <Copyright />
      </Container>
    </Container>
  );
}
