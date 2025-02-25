import { cn } from "@/app/_lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import * as React from "react";

const linkVariants = cva("", {
  variants: {
    isUnderlineDisabled: {
      false:
        "underline decoration-zinc-400 underline-offset-[2.5px] transition-colors duration-200 hover:decoration-zinc-950"
    },
    isHrefExternal: {
      true: "inline-flex items-center gap-1"
    }
  },
  defaultVariants: {
    isUnderlineDisabled: false,
    isHrefExternal: false
  }
});

type LinkProps = React.ComponentProps<typeof NextLink> &
  VariantProps<typeof linkVariants> & {
    href: string;
    children: React.ReactNode;
    className?: string;
    isUnderlineDisabled?: boolean;
  };

function Link({ children, href, className, isUnderlineDisabled = false, ...other }: LinkProps) {
  const isHrefExternal = React.useMemo(() => {
    // server side rendering safe check for external links
    return /^https?:\/\//.test(href);
  }, [href]);

  const externalLinkProps = React.useMemo(() => {
    if (!isHrefExternal) {
      return {};
    }

    return {
      target: "_blank",
      rel: "noopener noreferrer"
    };
  }, [isHrefExternal]);

  return (
    <NextLink
      className={cn(
        linkVariants({
          isUnderlineDisabled,
          isHrefExternal
        }),
        className
      )}
      href={href}
      {...externalLinkProps}
      {...other}
    >
      {children}
    </NextLink>
  );
}

export { Link, linkVariants };
