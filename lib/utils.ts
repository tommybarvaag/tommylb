import { clsx, type ClassValue } from "clsx";
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
  // Canonical URL first; Vercel system vars are host-only fallbacks for previews.
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";
  const base = (
    raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`
  ).replace(/\/+$/, "");

  if (path) {
    return `${base}/${path.replace(/^\/+/, "")}`;
  }

  return base;
}
