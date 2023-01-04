export type IconType = {
  width?: number;
  height?: number;
  className?: string;
};

import type { Icon as LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronsRight,
  ChevronUp,
  Flame,
  Send,
  Twitter,
  X
} from "lucide-react";

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
  ChevronsRight
};
