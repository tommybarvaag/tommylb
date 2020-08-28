import React from "react";
import { Container } from "theme-ui";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <Container as="footer">
      <Container>
        <Copyright />
      </Container>
    </Container>
  );
}
