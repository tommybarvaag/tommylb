"use client";

import * as React from "react";

import { Button } from "@/components/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/collapsible";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <CollapsibleContent forceMount className={cn("overflow-hidden", !isOpened && "max-h-32")}>
          <div
            className={cn(
              "[&_pre]:max-h-[650px [&_pre]:my-0 [&_pre]:pb-[64px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center",
            isOpened
              ? "inset-x-0 bottom-3 h-12"
              : "inset-0 bg-gradient-to-b from-zinc-900/30 to-zinc-900/90 p-2"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="subtle" className="h-8 text-xs">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
