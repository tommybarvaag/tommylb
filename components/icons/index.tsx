import { ComponentPropsWithoutRef, FC } from "react";

import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, LogIn, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

const BackToHome: FC<ComponentPropsWithoutRef<typeof LogIn> & { className?: string }> = ({
  className,
  ...other
}) => {
  return <LogIn className={cn("rotate-180", className)} {...other} />;
};

const At: FC<ComponentPropsWithoutRef<typeof LogIn> & { className?: string }> = ({
  className,
  ...other
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-5", className)}
      {...other}
    >
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </svg>
  );
};

const XLogo: FC<ComponentPropsWithoutRef<typeof LogIn> & { className?: string }> = ({
  className,
  ...other
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6 fill-foreground", className)}
      {...other}
    >
      <g>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </g>
    </svg>
  );
};

export const Icons = {
  At,
  Check,
  Download,
  Send,
  ArrowRight,
  X,
  XLogo,
  ArrowUpRight,
  ArrowLeft,
  BackToHome
};
