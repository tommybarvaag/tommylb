export type IconType = {
  width?: number;
  height?: number;
  className?: string;
};

import { cn } from "@/lib/utils";
import type { Icon as LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Flame,
  LogIn,
  Send,
  Twitter,
  X
} from "lucide-react";
import { ComponentPropsWithoutRef, FC } from "react";

const BackToHome: FC<ComponentPropsWithoutRef<typeof LogIn> & { className?: string }> = ({
  className,
  ...other
}) => {
  return <LogIn className={cn("rotate-180", className)} {...other} />;
};

const Spinner: FC<ComponentPropsWithoutRef<typeof LogIn> & { className?: string }> = ({
  className,
  ...other
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...other}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export type Icon = LucideIcon;

export const Icons = {
  Twitter,
  Check,
  Send,
  ArrowRight,
  X,
  Fire: Flame,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowUpRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  LogIn,
  BackToHome,
  Spinner
};
