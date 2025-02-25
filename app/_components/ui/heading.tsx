"use client";

import type { ComponentPropsWithoutRef, ComponentRef } from "react";
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
      default: "text-base leading-snug"
    },
    font: {
      default: "font-medium",
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

const Heading = forwardRef<ComponentRef<typeof ReactAriaHeading>, HeadingProps>(
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
            size: size,
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
