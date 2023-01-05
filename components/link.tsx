import { cn } from "@/lib/utils";
import NextLink from "next/link";
import * as React from "react";
import { Icons } from "./icons";
import { Show } from "./show";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
};

export default function Link({ children, href, className, underline = true, ...other }: LinkProps) {
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
        "",
        {
          "underline underline-offset-2 decoration-gray-500 hover:decoration-gray-300 transition-colors duration-200":
            underline
        },
        { "inline-flex items-center gap-1": isHrefExternal },
        className
      )}
      href={href}
      {...externalLinkProps}
      {...other}
    >
      {children}
      <Show when={isHrefExternal}>
        <Icons.ArrowUpRight className="h-4 w-4 text-gray-500" />
      </Show>
    </NextLink>
  );
}
