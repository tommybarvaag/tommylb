import { cn } from "@/lib/utils";

export const highlightedPreClassName =
  "mt-6 mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4";

export function HighlightedCode({ html }: { html: string }) {
  return (
    <code
      className="shiki css-variables font-mono text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function HighlightedPre({ html, className }: { html: string; className?: string }) {
  return (
    <pre className={cn(highlightedPreClassName, className)}>
      <HighlightedCode html={html} />
    </pre>
  );
}
