import * as React from "react";
import Footer from "../components/footer";
import Main from "../components/main";
import Nav from "../components/nav";
import Seo from "../components/seo";

export default function Layout({ children, ...other }) {
  return (
    <>
      <Seo />
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
