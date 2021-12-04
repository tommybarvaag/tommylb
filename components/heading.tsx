import clsx from "clsx";
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
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
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
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    default:
      return "h2";
  }
}

type HeadingProps = {
  as?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: string;
  noMargin?: boolean;
};

export default function Heading({
  children,
  as = "h2",
  variant,
  className,
  noMargin = false,
  ...other
}: HeadingProps) {
  const Component = getComponentForHeading(as);
  const headerVariant = getVariantForHeading(variant ?? as);

  return (
    <Component
      className={clsx(
        "font-bold tracking-tight text-gray-900 dark:text-gray-100",
        { "mb-8": !noMargin },
        { "text-4xl md:text-6xl": headerVariant === "pageHeading" },
        { "text-3xl md:text-5xl": headerVariant === "h1" },
        { "text-2xl md:text-4xl": headerVariant === "h2" },
        { "text-xl md:text-3xl": headerVariant === "h3" },
        { "text-lg md:text-2xl": headerVariant === "h4" },
        { "text-base md:text-xl": headerVariant === "h5" },
        { "text-sm md:text-lg": headerVariant === "h6" },
        className
      )}
      {...other}
    >
      {children}
    </Component>
  );
}
