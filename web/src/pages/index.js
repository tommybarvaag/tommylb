import React from "react";
import Button from "../components/button";
import ContactForm from "../components/contactForm";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Button>Click me</Button>
      <ContactForm />
    </Layout>
  );
}
