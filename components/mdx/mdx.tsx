import { ShowPlatformClient } from "@/app/(cv)/cv/_components/show-platform-client";
import { ParallelismLiveTestExample } from "@/app/(main)/example/parallelism-live-test/_components/parallelism-live-test-example";
import { Heading } from "@/components/heading";
import Link from "@/components/link";
import { Callout } from "@/components/mdx/callout";
import { Card } from "@/components/mdx/card";
import { CodeBlockWrapper } from "@/components/mdx/code-block-wrapper";
import { ComponentSource } from "@/components/mdx/component-source";
import Text from "@/components/text";
import { TwitterCard } from "@/components/twitter-card";
import { cn } from "@/lib/utils";
import { getHumanizedDateFromNow } from "@/utils/date-utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import { Suspense } from "react";
import type { Tweet } from "react-tweet/api";

const components = {
  h1: ({ className, ...props }) => <Heading variant="h1" className="mt-8 text-xl" {...props} />,
  h2: ({ className, ...props }) => (
    <Heading variant="h2" className="group mt-8 cursor-pointer" {...props} />
  ),
  h3: ({ className, ...props }) => <Heading variant="h3" className="group mt-8" {...props} />,
  h4: ({ className, ...props }) => <Heading variant="h3" className="group mt-8" {...props} />,
  h5: ({ className, ...props }) => <Heading variant="h3" className="group mt-8" {...props} />,
  h6: ({ className, ...props }) => <Heading variant="h3" className="group mt-8" {...props} />,
  a: ({ className, ...props }: { children: React.ReactNode; className?: string; href: string }) => (
    <Link
      className={cn("font-medium text-zinc-100 underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <Text className={cn("mb-0 mt-6 leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn("mt-2", className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-300",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-lg border border-zinc-200", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 border-zinc-200 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t border-zinc-700 p-0 even:bg-zinc-800", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-zinc-700 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border border-zinc-700 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border-x-4 border-b-4 border-t-4 border-zinc-950 border-b-zinc-950 border-t-zinc-950 bg-zinc-950 py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border border-zinc-950 bg-zinc-950 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-200",
        className
      )}
      {...props}
    />
  ),
  Image: ({ ...props }) => <Image alt={props.alt} src={props.src} {...props} />,
  Callout,
  Card,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border border-slate-100" {...props} />
  ),
  ComponentSource: ({ src, ...other }) => <ComponentSource src={src} {...other} />,
  TimeAgo: ({ code = false, ...props }) => {
    const Component = code ? "code" : "span";

    return (
      <Component
        className="relative rounded border border-zinc-950 bg-zinc-950 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-200"
        {...props}
      >
        {getHumanizedDateFromNow(new Date(2023, 11, 2))} ago
      </Component>
    );
  }
};

type MdxProps = React.ComponentPropsWithoutRef<"div"> & {
  code: string;
  className?: string;
  tweets: Tweet[];
};

export function Mdx({ code, tweets, className, ...other }: MdxProps) {
  const Component = useMDXComponent(code);

  const Tweet = ({ id }: { id: string }) => {
    const tweet = tweets?.find(tweet => tweet?.id_str === id);
    return <TwitterCard tweet={tweet} />;
  };

  const ParallelismWithPromisesExample = () => {
    return (
      <Suspense fallback={<div />}>
        <div className="mb-8">
          <ParallelismLiveTestExample />
        </div>
      </Suspense>
    );
  };

  const ShowPlatformExample = () => {
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
                Hi there! You&apos;re seeing this because you&apos;re on mobile right now. If you
                load this page on desktop, you&apos;ll see a different callout.
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
  };

  return (
    <div {...other}>
      <Component
        components={{
          ...components,
          Tweet,
          ParallelismWithPromisesExample,
          ShowPlatformExample
        }}
      />
    </div>
  );
}
