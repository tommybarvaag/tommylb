import React from "react";
import ContactForm from "../components/contactForm";
import { Container } from "../components/container";
import Hero from "../components/hero";

export default function Home() {
  return (
    <Container center>
      <Hero />
      <ContactForm />
    </Container>
  );
}
