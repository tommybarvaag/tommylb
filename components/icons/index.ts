import ArrowNarrowRight from "./arrowNarrowRight";
import Calendar from "./calendar";
import Check from "./check";
import ExclamationCircle from "./exclamationCircle";
import Fire from "./fire";
import GitHub from "./gitHub";
import LinkedIn from "./linkedIn";
import Mail from "./mail";
import Moon from "./moon";
import PaperAirplane from "./paperAirplane";
import Sun from "./sun";
import ThumbsUp from "./thumbsUp";

export type IconType = {
  width?: number;
  height?: number;
  className?: string;
};

import type { Icon as LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Command,
  File,
  FileText,
  Github,
  HelpCircle,
  Image,
  Loader2,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  X
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  gitHub: Github,
  twitter: Twitter
};

export {
  ArrowNarrowRight,
  Calendar,
  Check,
  ExclamationCircle,
  Fire,
  GitHub,
  LinkedIn,
  Mail,
  Moon,
  PaperAirplane,
  Sun,
  ThumbsUp
};
