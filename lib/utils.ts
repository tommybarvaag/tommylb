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
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit"
  });
}

export function getAbsoluteUrl(path?: string) {
  const base =
    process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_APP_URL;

  if (path) {
    // ensure no double slashes
    return `${base}/${path}`.replace(/\/+/g, "/");
  }

  return base;
}
