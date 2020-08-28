import * as React from "react";
import { Container } from "theme-ui";
import Footer from "../components/footer";
import GlobalStyles from "../components/globalStyles";
import Nav from "../components/nav";
import Seo from "../components/seo";

export default function Layout({ children, ...other }) {
  console.log(other);
  return (
    <>
      <GlobalStyles />
      <Seo />
      <Nav />
      <Container as="main" maxWidth={false}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
