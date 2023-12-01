import { Icons } from "@/components/icons";
import { Show } from "@/components/show";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import * as React from "react";

type LinkElement = React.ElementRef<typeof NextLink>;
type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  showExternalLinkIcon?: boolean;
};

const Link = React.forwardRef<LinkElement, LinkProps>(
  (
    { children, href, className, underline = true, showExternalLinkIcon = true, ...other },
    forwardedRef
  ) => {
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
            "underline decoration-zinc-500 underline-offset-[2.5px] transition-colors duration-200 hover:decoration-zinc-300":
              underline
          },
          { "inline-flex items-center gap-1": isHrefExternal },
          className
        )}
        href={href}
        ref={forwardedRef}
        {...externalLinkProps}
        {...other}
      >
        {children}
        <Show when={showExternalLinkIcon && isHrefExternal}>
          <Icons.ArrowUpRight className="h-4 w-4 opacity-50" />
        </Show>
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
