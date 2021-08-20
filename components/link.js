import clsx from "clsx";
import NextLink from "next/link";
import * as React from "react";

export default function Link({ children, href, className, NextLinkProps = {}, ...other }) {
  return (
    <NextLink href={href} passHref {...NextLinkProps}>
      <a className={clsx("text-gray-900 dark:text-gray-100", className)} {...other}>
        {children}
      </a>
    </NextLink>
  );
}
