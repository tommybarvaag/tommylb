import React from "react";
import { Container, Heading, Text } from "theme-ui";

export default function Hero({ title, text }) {
  return (
    <Container centerSection maxWidth="70rem">
      <Heading as="h1">{title}</Heading>
      <Text>{text}</Text>
    </Container>
  );
}
