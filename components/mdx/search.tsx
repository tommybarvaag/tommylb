"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function DocsSearch({ className, ...props }: DocsSearchProps) {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    alert("Not implemented yet");
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative w-full", className)} {...props}>
      <input
        type="search"
        placeholder="Search documentation..."
        className="block h-8 w-full appearance-none rounded-md border border-zinc-200 bg-zinc-100 py-2 px-3 text-sm placeholder:text-zinc-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 sm:w-64 sm:pr-12"
      />
      <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-zinc-300 opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  );
}
