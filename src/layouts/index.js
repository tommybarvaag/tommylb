import * as React from "react";
import { Box, Container, IconButton, Text, useColorMode } from "theme-ui";
import Copyright from "../components/copyright";
import GlobalStyles from "../components/globalStyles";
import { Moon, Sun } from "../components/icons";
import Link from "../components/link";
import Seo from "../components/seo";

export default function Layout({ children, ...other }) {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <>
      <GlobalStyles />
      <Seo />
      <Container as="nav" variant="nav">
        <Box variant="secondary">
          <Link href="/">
            <Text fontWeight={0}>Tommy Lunde Barvåg</Text>
          </Link>
        </Box>
        <Box>
          <IconButton
            onClick={() => {
              setColorMode(colorMode === "default" ? "dark" : "default");
            }}
          >
            {colorMode === "default" ? <Moon /> : <Sun />}
          </IconButton>
        </Box>
      </Container>
      <Container as="main" variant="main">
        {children}
      </Container>
      <Container as="footer" variant="footer">
        <Container>
          <Copyright />
        </Container>
      </Container>
    </>
  );
}
