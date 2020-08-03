import React from "react";
import { Container } from "./container";
import { Flex } from "./flex";
import { FlexItem } from "./flexItem";
import Link from "./link";
import { Typography } from "./typography";

export default function Nav() {
  return (
    <Container as="nav" height={24} px={4}>
      <Flex height="full">
        <FlexItem justifyContent="center" alignItems="center">
          <Link href="/">
            <Typography fontWeight="lighter">Tommy Lunde Barvåg</Typography>
          </Link>
        </FlexItem>
      </Flex>
    </Container>
  );
}
