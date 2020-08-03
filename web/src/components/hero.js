import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

export default function Hero() {
  return (
    <Container centerSection maxWidth="96rem">
      <Heading as="h1" textAlign="center">
        Hi, I'm Tommy Lunde Barvåg 👋
      </Heading>
      <Paragraph m="0 auto" maxWidth="72rem" textAlign="center">
        I’m a full stack developer. I’ve spent the last six years creating web solutions for great
        companies.
      </Paragraph>
    </Container>
  );
}
