import { cn } from "@/lib/utils";
import * as React from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Main({ children, className, ...other }: MainProps) {
  return (
    <main
      className={cn(
        "mx-auto mb-16 flex w-full max-w-2xl grow flex-col items-start justify-start bg-zinc-900 px-8",
        className
      )}
      {...other}
    >
      {children}
    </main>
  );
}
