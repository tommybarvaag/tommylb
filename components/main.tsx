import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const mainVariants = cva(
  "mx-auto mb-16 flex w-full max-w-2xl grow flex-col items-start justify-start bg-zinc-900 px-8",
  {
    variants: {
      size: {
        default: "pt-14 sm:pt-32 max-w-2xl",
        wide: "pt-14 sm:pt-24 max-w-4xl"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);

type MainProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof mainVariants>;

export default function Main({ children, className, size, ...other }: MainProps) {
  return (
    <main className={cn(mainVariants({ size }), className)} {...other}>
      {children}
    </main>
  );
}
