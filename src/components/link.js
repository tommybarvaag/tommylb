import styled from "@emotion/styled";
import NextLink from "next/link";
import * as React from "react";
import { Link as ThemeUiLink } from "theme-ui";

const StyledLink = styled(ThemeUiLink)``;

export default function Link({ children, href, NextLinkProps = {}, ...other }) {
  return (
    <NextLink href={href} passHref {...NextLinkProps}>
      <StyledLink as="a" {...other}>
        {children}
      </StyledLink>
    </NextLink>
  );
}
