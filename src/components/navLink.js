import styled from "@emotion/styled";
import NextLink from "next/link";
import * as React from "react";
import { NavLink as ThemeUiNavLink } from "theme-ui";

const StyledLink = styled(ThemeUiNavLink)``;

export default function NavLink({ children, href, as, ...other }) {
  return (
    <NextLink href={href} as={as} passHref>
      <StyledLink as="a" {...other}>
        {children}
      </StyledLink>
    </NextLink>
  );
}
