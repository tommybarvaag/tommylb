"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { Heading as ReactAriaHeading } from "react-aria-components";

import { cn } from "@/app/_lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva("", {
  variants: {
    variant: {
      default: "text-inherit",
      foreground: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      brand: "text-brand",
      muted: "text-muted-foreground",
      inherit: "text-inherit",
      destructive: "text-destructive"
    },
    size: {
      default: "text-base leading-snug",
      sm: "text-sm leading-snug",
      lg: "text-lg leading-snug",
      xl: "text-xl leading-snug",
      "2xl": "text-2xl leading-snug",
      "3xl": "text-3xl leading-snug",
      "4xl": "text-4xl leading-snug",
      "5xl": "text-5xl leading-snug",
      "6xl": "text-6xl leading-tight"
    },
    font: {
      default: "font-bold",
      normal: "font-normal",
      semi: "font-semibold"
    },
    prose: {
      true: ""
    },
    noMargin: {
      true: "mb-0"
    },
    uppercase: {
      true: "uppercase"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    font: "default"
  }
});

export type HeadingProps = ComponentPropsWithoutRef<typeof ReactAriaHeading> &
  VariantProps<typeof headingVariants>;

function getSizeByHeadingLevel(level: number): VariantProps<typeof headingVariants>["size"] {
  switch (level) {
    case 1:
      return "2xl";
    case 2:
      return "lg";
    default:
      return "default";
  }
}

const Heading = forwardRef<ElementRef<typeof ReactAriaHeading>, HeadingProps>(
  (
    {
      className,
      children,
      variant = "default",
      size,
      font,
      level = 2,
      prose,
      noMargin,
      uppercase,
      ...props
    },
    ref
  ) => {
    return (
      <ReactAriaHeading
        className={cn(
          headingVariants({
            variant,
            size: size ?? getSizeByHeadingLevel(level),
            prose,
            noMargin,
            uppercase,
            font
          }),
          className
        )}
        level={level}
        {...props}
        ref={ref}
      >
        {children}
      </ReactAriaHeading>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };
