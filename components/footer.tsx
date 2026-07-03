import { HtmlHTMLAttributes } from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Link from "@/components/link";
import ThemeToggle from "@/components/theme-toggle";

const footerVariants = cva("border-t border-border px-8 py-4 text-sm", {
  variants: {
    size: {
      default: "px-8",
      wide: "px-6"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export default function Footer({
  className,
  size = "default",
  ...other
}: HtmlHTMLAttributes<HTMLDivElement> & VariantProps<typeof footerVariants>) {
  return (
    <footer className={cn(footerVariants({ size }), className)} {...other}>
      <div
        className={cn("mx-auto flex max-w-2xl items-center justify-between", {
          "max-w-2xl": size === "default",
          "max-w-4xl": size === "wide"
        })}
      >
        <Link href="/" underline={false}>
          Tommy Lunde Barvåg
        </Link>
        <div className="flex items-center gap-2">
          <Link href="https://github.com/tommybarvaag" aria-label="View my code at GitHub">
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/tommybarvaag/"
            aria-label="View my profil at LinkedIn"
          >
            LinkedIn
          </Link>
          <Link href="mailto:tommy@barvaag.com" aria-label="Send me something at tommy@barvaag.com">
            Mail
          </Link>
          <Link href="/cv" aria-label="View my CV">
            CV
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
