import Link from "@/components/link";
import { cn } from "@/lib/utils";
import * as React from "react";

type LinkButtonProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

export default function LinkButton({ children, className, href, ...other }: LinkButtonProps) {
  return (
    <Link href={href} className="block p-0 sm:p-0" underline={false}>
      <button
        className={cn(
          "my-6 inline-flex items-center justify-center rounded-lg bg-white p-3 text-zinc-900 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
          className
        )}
        {...other}
      >
        {children}
      </button>
    </Link>
  );
}
