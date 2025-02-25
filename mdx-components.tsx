import { Link, linkVariants } from "@/app/_components/ui/link";
import { ComponentPropsWithoutRef, Suspense } from "react";
import { highlight } from "sugar-high";
import { SiteAnchor } from "./app/_components/site-anchor";
import { Heading } from "./app/_components/ui/heading";
import { Text } from "./app/_components/ui/text";
import { cn } from "./app/_lib/utils";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => <Heading level={1} className="mb-0" {...props} />,
  h2: (props: HeadingProps) => <Heading level={2} {...props} />,
  h3: (props: HeadingProps) => <Heading level={3} {...props} />,
  h4: (props: HeadingProps) => <Heading level={4} {...props} />,
  p: (props: ParagraphProps) => <Text {...props} />,
  ol: (props: ListProps) => <ol className="list-decimal space-y-2 pl-5" {...props} />,
  ul: (props: ListProps) => <ul className="list-disc space-y-1 pl-5" {...props} />,
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em className="font-medium" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, className, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    if (href?.startsWith("#")) {
      return (
        <a href={href} className={cn(linkVariants(), className)} {...props}>
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        className={cn(linkVariants(), className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, className, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className={cn("font-mono text-sm", className)}
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 flex flex-col items-start rounded-lg border border-l-4 border-zinc-950 bg-zinc-100 p-4"
      {...props}
    />
  ),
  Tweet: () => <Suspense>TODO: Tweet</Suspense>,
  SiteAnchor
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
