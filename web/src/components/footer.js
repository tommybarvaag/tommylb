import React from "react";
import { Container } from "./container";
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
