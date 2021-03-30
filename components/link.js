import NextLink from "next/link";
import * as React from "react";

export default function Link({ children, href, NextLinkProps = {}, ...other }) {
  return (
    <NextLink href={href} passHref {...NextLinkProps}>
      <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100" {...other}>
        {children}
      </a>
    </NextLink>
  );
}
