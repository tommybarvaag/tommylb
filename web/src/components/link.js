import styled from "@emotion/styled";
import NextLink from "next/link";
import * as React from "react";
import { Box } from "./box";

const StyledLink = styled(Box)`
  text-decoration: none;
`;

export default function Link({ children, href, as, color = "link" }) {
  return (
    <NextLink href={href} as={as} passHref>
      <StyledLink as="a">{children}</StyledLink>
    </NextLink>
  );
}
