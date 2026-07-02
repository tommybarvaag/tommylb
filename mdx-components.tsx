import React, { Suspense } from "react";

import { cacheLife } from "next/cache";

import type { MDXComponents } from "mdx/types";
import { getTweet } from "react-tweet/api";

import { cn } from "@/lib/utils";

import { ActiveWorkYears as ActiveWorkYearsRoot } from "@/components/active-work-years";
import Link from "@/components/link";
import Text from "@/components/text";
import { TwitterCard } from "@/components/twitter-card";

import { ShowPlatformClient } from "@/app/(cv)/cv/_components/show-platform-client";
import { ParallelismLiveTestExample } from "@/app/(main)/example/parallelism-live-test/_components/parallelism-live-test-example";
import { Callout } from "@/app/mdx/callout";
import { Card } from "@/app/mdx/card";
import { CodeBlockWrapper } from "@/app/mdx/code-block-wrapper";
import { ComponentSource } from "@/app/mdx/component-source";
import { highlightCode } from "@/app/mdx/highlight-code";
import { getHumanizedDateFromNow } from "@/utils/date-utils";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);

  if (Array.isArray(node)) return node.map(getNodeText).join("");

  if (React.isValidElement(node))
    return getNodeText((node.props as { children?: React.ReactNode }).children);

  return "";
}

function createHeading(level: number) {
  const Heading = ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(getNodeText(children));

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: cn("anchor", {
            "text-xl": level === 1,
            group: level > 1
          })
        })
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;

  return Heading;
}

async function CodeBlock(props: { children?: React.ReactNode; className?: string }) {
  const classNames = props.className || "";
  // Fenced code blocks carry a `language-*` class (info string); inline `code` from
  // GFM backticks has a plain-string child but NO class. Gate Shiki on the class so
  // inline code is NOT syntax-highlighted (and keeps its pill styling below).
  // Split on whitespace OR comma to be robust to either info-string delimiter.
  const languageClass = classNames.split(/[\s,]+/).find(c => c.startsWith("language-"));

  if (typeof props.children === "string" && languageClass) {
    const html = await highlightCode(props.children, languageClass.replace("language-", ""));

    return (
      <code
        className="shiki css-variables font-mono text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <code
      className={cn(
        "rounded border border-border bg-muted px-1 py-0.5 font-mono text-sm",
        props.className
      )}
      {...props}
    />
  );
}

// Embedded tweets are fixed content — fetch once at build, cache immutably.
async function getCachedTweet(id: string) {
  "use cache";
  cacheLife("max");

  return getTweet(id);
}

async function AsyncTweet({ id }: { id: string }) {
  const tweet = await getCachedTweet(id);

  if (!tweet) {
    return null;
  }

  return <TwitterCard tweet={tweet} />;
}

function Tweet({ id }: { id: string }) {
  return (
    <Suspense fallback={<div />}>
      <AsyncTweet id={id} />
    </Suspense>
  );
}

function ParallelismWithPromisesExample() {
  return (
    <Suspense fallback={<div />}>
      <div className="mb-8">
        <ParallelismLiveTestExample />
      </div>
    </Suspense>
  );
}

function TimeAgo({ code = false, ...props }: { code?: boolean }) {
  const Component = code ? "code" : "span";

  return (
    <Component
      className="relative rounded border border-border bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground"
      {...props}
    >
      {getHumanizedDateFromNow(new Date(2023, 11, 2))} ago
    </Component>
  );
}

function ShowPlatformExample() {
  return (
    <Suspense fallback={<div />}>
      <ShowPlatformClient
        platforms={{
          desktop: (
            <Callout type="info">
              Hi there! You&apos;re seeing this because you&apos;re on desktop right now. If you
              load this page on mobile, you&apos;ll see a different callout.
            </Callout>
          ),
          touch: (
            <Callout type="info">
              Hi there! You&apos;re seeing this because you&apos;re on mobile right now. If you load
              this page on desktop, you&apos;ll see a different callout.
            </Callout>
          ),
          bot: (
            <Callout type="info">
              Hi there! You&apos;re seeing this because you&apos;re on a bot.
            </Callout>
          ),
          fallback: (
            <Callout type="warning">
              Hi there! You&apos;re seeing this because the server failed to determine your
              platform. This might be because you&apos;re using a browser that the server
              doesn&apos;t recognize. I would appreciate it if you could let me know what browser
              you&apos;re using by sending me a <a href="/connect">message</a>.
            </Callout>
          )
        }}
      />
    </Suspense>
  );
}

const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: ({ className, ...props }: { children: React.ReactNode; className?: string; href: string }) => (
    <Link className={cn("text-foreground underline underline-offset-4", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <Text className={cn("mt-6 mb-0 leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn("not-prose mt-2", className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-border pl-6 text-muted-foreground italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 border-border md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t border-border p-0 even:bg-muted", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border border-border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4",
        className
      )}
      {...props}
    />
  ),
  code: CodeBlock,
  Callout,
  Card,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border border-border" {...props} />
  ),
  ComponentSource: ({ src, ...other }: { src: string }) => <ComponentSource src={src} {...other} />,
  TimeAgo,
  ActiveWorkYears: ({ ...props }) => (
    <Text className="mt-6 mb-0 leading-7" {...props}>
      <ActiveWorkYearsRoot />
    </Text>
  ),
  Tweet,
  ParallelismWithPromisesExample,
  ShowPlatformExample
};

export function useMDXComponents(): MDXComponents {
  return components;
}
