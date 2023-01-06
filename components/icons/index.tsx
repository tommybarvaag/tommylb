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
  BackToHome
};
