import Link from "@/components/link";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HtmlHTMLAttributes } from "react";

const footerVariants = cva("border-t border-zinc-700 px-6 py-4 text-sm", {
  variants: {
    size: {
      default: "",
      wide: ""
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
        className={cn("mx-auto flex max-w-xl items-center justify-between", {
          "max-w-xl": size === "default",
          "max-w-3xl": size === "wide"
        })}
      >
        <Link href="/" underline={false}>
          Tommy Lunde Barvåg
        </Link>
        <div className="flex gap-2">
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
        </div>
      </div>
    </footer>
  );
}
