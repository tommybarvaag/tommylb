import { cacheLife } from "next/cache";

import { promises as fs } from "fs";
import path from "path";

import { cn } from "@/lib/utils";

import { CodeBlockWrapper } from "@/app/mdx/code-block-wrapper";
import { highlightCode } from "@/app/mdx/highlight-code";

type ComponentSourceProps = {
  src: string;
  className?: string;
  forceMount?: boolean;
};

// Next's output tracing only narrows on literal readFile paths — a dynamic
// path drags the whole project into the server bundle. Displayable files are
// enumerated here; add an entry to display a new file.
const sourceFiles: Record<string, () => Promise<string>> = {
  "/app/(main)/example/parallelism-live-test/_components/parallelism-live-test-all-settled.tsx":
    () =>
      fs.readFile(
        path.join(
          process.cwd(),
          "app/(main)/example/parallelism-live-test/_components/parallelism-live-test-all-settled.tsx"
        ),
        "utf8"
      ),
  "/app/(main)/example/parallelism-live-test/_components/parallelism-live-test-async-await.tsx":
    () =>
      fs.readFile(
        path.join(
          process.cwd(),
          "app/(main)/example/parallelism-live-test/_components/parallelism-live-test-async-await.tsx"
        ),
        "utf8"
      )
};

// Source files are fixed per deployment — cache the read + highlight so Cache
// Components prerenders them instead of treating them as runtime IO.
async function getHighlightedSource(src: string) {
  "use cache";
  cacheLife("max");

  const loadSource = sourceFiles[src];

  if (!loadSource) {
    throw new Error(`ComponentSource src is not in the sourceFiles allowlist: ${src}`);
  }

  const source = await loadSource();
  const lang = src.split(".").pop() ?? "tsx";

  return highlightCode(source.trim(), lang);
}

export async function ComponentSource({
  src,
  className,
  forceMount = false
}: ComponentSourceProps) {
  const html = await getHighlightedSource(src);

  return (
    <CodeBlockWrapper
      expandButtonTitle="View code"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      forceMount={forceMount}
    >
      <pre className="mt-6 mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4">
        <code
          className="shiki css-variables font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </CodeBlockWrapper>
  );
}
