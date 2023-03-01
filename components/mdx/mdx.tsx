import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import * as React from "react";

import { Callout } from "@/components/mdx/callout";
import { Card } from "@/components/mdx/card";
import { cn } from "@/lib/utils";
import Heading from "../heading";
import Link from "../link";
import Text from "../text";

const components = {
  h1: ({ className, ...props }) => (
    <Heading variant="pageHeading" className="mt-8 text-xl" {...props} />
  ),
  h2: ({ className, ...props }) => (
    <Heading variant="h2" className="group mt-8 text-lg" {...props} />
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
    <img className={cn("rounded-md border border-zinc-200", className)} alt={alt} {...props} />
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
        "mt-6 mb-4 overflow-x-auto rounded-lg border-4 border-zinc-800 bg-zinc-800 py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border bg-zinc-800  py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-200",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card
};

type MdxProps = React.ComponentPropsWithoutRef<"div"> & {
  code: string;
  className?: string;
};

export function Mdx({ code, className, ...other }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div {...other}>
      <Component components={components} />
    </div>
  );
}
