import React from "react";
import Container from "./container";
import Footer from "./footer";
import Hero from "./hero";
import Nav from "./nav";
import Seo from "./seo";

export default function Layout(props) {
  const { children, ...other } = props;

  return (
    <>
      <Seo />
      <Nav />
      <Hero />
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
}
