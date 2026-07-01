import { cn } from "@/lib/utils";
import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none data-[popup-open]:bg-accent",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "bg-transparent border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        subtle: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground data-popup-open:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-foreground hover:bg-transparent"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {leftIcon ? <div className="mr-2">{leftIcon}</div> : null}
        {children}
        {rightIcon ? <div className="ml-2">{rightIcon}</div> : null}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
