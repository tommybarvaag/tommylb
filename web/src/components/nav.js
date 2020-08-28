import React from "react";
import { Box, Button, Container, Flex, Text, useColorMode } from "theme-ui";
import Link from "./link";

export default function Nav() {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Container as="nav" px={4}>
      <Flex>
        <Box variant="secondary">
          <Link href="/">
            <Text fontWeight={0}>Tommy Lunde Barvåg</Text>
          </Link>
        </Box>
        <Box>
          <Button
            onClick={e => {
              setColorMode(colorMode === "default" ? "dark" : "default");
            }}
          >
            Toggle {colorMode === "default" ? "Dark" : "Light"}
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}
