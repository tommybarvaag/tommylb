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

export function formatSlug(slug: string): string {
  const lowerCaseWords = new Set([
    "of",
    "the",
    "and",
    "in",
    "on",
    "at",
    "for",
    "with",
    "a",
    "an",
    "to",
    "by",
    "from",
    "but",
    "or",
    "nor",
    "so",
    "yet"
  ]);

  return slug
    .split("-") // Split by hyphen
    .map((word, index) =>
      index === 0 || !lowerCaseWords.has(word) // Always capitalize the first word
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase()
    )
    .join(" "); // Join back with spaces
}
