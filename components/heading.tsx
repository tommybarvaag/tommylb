import { cn } from "@/lib/utils";
import * as React from "react";

function getComponentForHeading(as) {
  switch (as) {
    case "pageHeading":
      return "h1";
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    default:
      return as;
  }
}

function getVariantForHeading(variant) {
  switch (variant) {
    case "pageHeading":
      return "pageHeading";
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    default:
      return "h2";
  }
}

const DEFAULT_TAG = "h2";

type HeadingProps = React.ComponentPropsWithoutRef<typeof DEFAULT_TAG> & {
  as?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "pageHeading" | "h1" | "h2" | "h3";
  noMargin?: boolean;
};

export default function Heading({
  children,
  as = DEFAULT_TAG,
  variant = DEFAULT_TAG,
  className,
  noMargin = false,
  ...other
}: HeadingProps) {
  const Component = getComponentForHeading(as);
  const headerVariant = getVariantForHeading(variant ?? as);

  return (
    <Component
      className={cn(
        "mb-8 font-normal leading-7 tracking-tight text-zinc-50",
        { "text-base": headerVariant === "pageHeading" },
        { "text-base": headerVariant === "h1" },
        { "text-base": headerVariant === "h2" },
        { "mb-4 text-base": headerVariant === "h3" },
        { "mb-0": noMargin },

        className
      )}
      {...other}
    >
      {children}
    </Component>
  );
}
