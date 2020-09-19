import * as React from "react";
import Footer from "../components/footer";
import GlobalStyles from "../components/globalStyles";
import Main from "../components/main";
import Nav from "../components/nav";
import Seo from "../components/seo";

export default function Layout({ children, ...other }) {
  return (
    <>
      <GlobalStyles />
      <Seo />
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
