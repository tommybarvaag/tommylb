import styled from "@emotion/styled";
import NextLink from "next/link";
import * as React from "react";
import { Link as ThemeUiLink } from "theme-ui";

const StyledLink = styled(ThemeUiLink)`
  text-decoration: none;
`;

export default function Link({ children, href, as, ...other }) {
  return (
    <NextLink href={href} as={as} passHref>
      <StyledLink as="a" {...other}>
        {children}
      </StyledLink>
    </NextLink>
  );
}
