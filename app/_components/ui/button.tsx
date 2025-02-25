"use client";

import { cn } from "@/app/_lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps
} from "react-aria-components";

const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring rounded-button pending:opacity-70 pending:pointer-events-none inline-flex select-none items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90"
      },
      size: {
        default: "px-8 py-3",
        xs: "h-7 px-2 text-xs [&>svg]:size-4",
        sm: "h-9 px-3 text-sm [&>svg]:size-4",
        lg: "h-11 px-8",
        icon: "size-10",
        "icon-xs": "size-6",
        "icon-sm": "size-8",
        "icon-lg": "size-12"
      },
      defaultVariants: {
        variant: "default",
        size: "default"
      }
    }
  }
);

export { buttonVariants };

export interface ButtonProps extends ReactAriaButtonProps, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ReactAriaButton
        className={values =>
          cn(
            buttonVariants({
              variant,
              size,
              className: typeof className === "function" ? className(values) : className,
              ...values
            })
          )
        }
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
