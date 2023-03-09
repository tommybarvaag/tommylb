"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CodeBlockWrapper } from "./code-block-wrapper";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

export function ComponentSource({ children, className }: ComponentSourceProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="View code"
      className={cn("my-6 overflow-hidden rounded-md", className)}
    >
      {children}
    </CodeBlockWrapper>
  );
}
