import clsx from "clsx";
import NextLink from "next/link";
import * as React from "react";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function Link({ children, href, className, ...other }: LinkProps) {
  return (
    <NextLink className={clsx("text-gray-100", className)} href={href} {...other}>
      {children}
    </NextLink>
  );
}
