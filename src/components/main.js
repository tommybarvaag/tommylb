import * as React from "react";
import { Container } from "theme-ui";

export default function Main({ children, ...other }) {
  return (
    <Container as="main" variant="main" {...other}>
      {children}
    </Container>
  );
}
