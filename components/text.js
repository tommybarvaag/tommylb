import clsx from "clsx";
import * as React from "react";

export default function Text({ children, as = "p", className, noMargin = false, ...other }) {
  const Component = as;
  return (
    <Component
      className={clsx("leading-5 text-gray-700 dark:text-gray-300", className, {
        "mb-4": !noMargin
      })}
      {...other}
    >
      {children}
    </Component>
  );
}
