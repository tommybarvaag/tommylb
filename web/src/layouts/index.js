import * as React from "react";
import { Box, Container, IconButton, Text, useColorMode } from "theme-ui";
import Copyright from "../components/copyright";
import GlobalStyles from "../components/globalStyles";
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
            {colorMode === "default" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
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
