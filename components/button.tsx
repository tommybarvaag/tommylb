import { cn } from "@/lib/utils";
import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-50 focus:ring-zinc-400 disabled:pointer-events-none focus:ring-offset-zinc-800 data-[state=open]:bg-zinc-800",
  {
    variants: {
      variant: {
        default: "hover:bg-zinc-700 bg-zinc-50 text-zinc-800",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "bg-transparent border hover:bg-zinc-100 border-zinc-700 text-zinc-100",
        subtle: "hover:bg-zinc-200 bg-zinc-700 text-zinc-100",
        ghost:
          "bg-transparent hover:bg-zinc-800 text-zinc-100 hover:text-zinc-100 data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-zinc-100 hover:bg-transparent"
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
