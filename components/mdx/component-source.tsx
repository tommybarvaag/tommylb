"use client";

import * as React from "react";

import { CodeBlockWrapper } from "@/components/mdx/code-block-wrapper";
import { cn } from "@/lib/utils";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  forceMount?: boolean;
}

export function ComponentSource({ children, className, forceMount = false }: ComponentSourceProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="View code"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      forceMount={forceMount}
    >
      {children}
    </CodeBlockWrapper>
  );
}
