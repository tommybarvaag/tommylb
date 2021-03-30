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
      return "h2";
  }
}

export default function Heading({ children, as = "h2", className, ...other }) {
  const Component = getComponentForHeading(as);

  return (
    <Component
      className={clsx(
        "font-bold tracking-tight mb-8 text-gray-900 dark:text-gray-100",
        { "text-4xl md:text-6xl": as === "pageHeading" },
        { "text-3xl md:text-5xl": as === "h1" },
        { "text-2xl md:text-4xl": as === "h2" },
        { "text-xl md:text-3xl": as === "h3" },
        { "text-lg md:text-2xl": as === "h4" },
        { "text-base md:text-xl": as === "h5" },
        { "text-sm md:text-lg": as === "h6" },
        className
      )}
      {...other}
    >
      {children}
    </Component>
  );
}
