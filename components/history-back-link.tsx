import { Icons } from "@/components/icons";
import Link from "@/components/link";
import { cn } from "@/lib/utils";
import { forwardRef, useMemo } from "react";

type HistoryBackLinkElement = React.ElementRef<typeof Link>;
type HistoryBackLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

const HistoryBackLink = forwardRef<HistoryBackLinkElement, HistoryBackLinkProps>(
  ({ children, className, href, ...other }, forwardedRef) => {
    const isHrefRoot = useMemo(() => /^\/$/.test(href), [href]);

    return (
      <Link
        className={cn(
          "mb-8 inline-flex items-center justify-center xl:absolute xl:left-[-200px] xl:mb-0",
          className
        )}
        href={href}
        underline={false}
        ref={forwardedRef}
        {...other}
      >
        {isHrefRoot ? (
          <Icons.BackToHome className="mr-2 size-4" />
        ) : (
          <Icons.ArrowLeft className="mr-2 size-4" />
        )}
        {children}
      </Link>
    );
  }
);

HistoryBackLink.displayName = "HistoryBackLink";

export { HistoryBackLink };
