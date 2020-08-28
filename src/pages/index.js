import React from "react";
import { Heading, Text } from "theme-ui";
import ContactForm from "../components/contactForm";
import Layout from "../layouts";

export default function Home() {
  return (
    <Layout>
      <Heading as="h1">Hi, I'm Tommy Lunde Barvåg</Heading>
      <Text>
        I’m a full stack developer. I’ve spent the last six years creating web solutions for great
        companies.
      </Text>
      <ContactForm />
    </Layout>
  );
}
