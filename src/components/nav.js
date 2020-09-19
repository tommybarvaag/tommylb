import * as React from "react";
import { Box, Container, IconButton, NavLink, Text, useColorMode } from "theme-ui";
import { Moon, Sun } from "./icons";

export default function Nav({ ...other }) {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Container as="nav" variant="nav" {...other}>
      <Box variant="secondary">
        <NavLink href="/">
          <Text fontWeight={0}>Tommy Lunde Barvåg</Text>
        </NavLink>
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
  );
}
