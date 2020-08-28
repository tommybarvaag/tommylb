import React from "react";
import { Container } from "theme-ui";
import ContactForm from "../components/contactForm";
import Hero from "../components/hero";
import Layout from "../layouts";

export default function Home() {
  return (
    <Layout>
      <Container center>
        <Hero
          title="Hi, I'm Tommy Lunde Barvåg"
          text="I’m a full stack developer. I’ve spent the last six years creating web solutions for great
        companies."
        />
        <ContactForm />
      </Container>
    </Layout>
  );
}
