"use client";

import { cn } from "@/app/_lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { Text as ReactAriaText } from "react-aria-components";

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      default: "text-inherit"
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl"
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      relaxed: "leading-relaxed",
      loose: "leading-loose"
    },
    truncate: {
      true: "truncate"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    leading: "relaxed",
    weight: "normal"
  }
});

export type TextProps = React.ComponentPropsWithoutRef<typeof ReactAriaText> &
  VariantProps<typeof textVariants>;

const Text = React.forwardRef<React.ComponentRef<typeof ReactAriaText>, TextProps>(
  ({ elementType = "p", variant, size, leading, truncate, weight, className, ...other }, ref) => {
    return (
      <ReactAriaText
        elementType={elementType}
        ref={ref}
        className={cn(textVariants({ variant, size, leading, truncate, weight }), className)}
        {...other}
      />
    );
  }
);

Text.displayName = "Text";

export { Text };
