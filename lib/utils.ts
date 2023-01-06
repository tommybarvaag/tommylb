import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function formatMonthDay(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("sv-SE", {
    month: "numeric",
    day: "numeric"
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
