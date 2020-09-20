import * as React from "react";
import { Container } from "theme-ui";
import Link from "../components/link";
import { GitHub, LinkedIn, Mail } from "./icons";

export default function Footer({ ...other }) {
  return (
    <Container as="footer" variant="footer" {...other}>
      <Container variant="center">
        <Link
          variant="icon-link-button"
          href="https://github.com/tommybarvaag"
          target="_blank"
          rel="noopener"
        >
          <GitHub />
        </Link>
        <Link
          variant="icon-link-button"
          href="https://www.linkedin.com/in/tommybarvaag/"
          target="_blank"
          rel="noopener"
        >
          <LinkedIn />
        </Link>
        <Link variant="icon-link-button" href="mailto:tommy@barvaag.com">
          <Mail />
        </Link>
      </Container>
    </Container>
  );
}
