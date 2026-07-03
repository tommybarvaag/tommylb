"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/collapsible";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
  expandButtonTitle?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  forceMount = false,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(forceMount);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <CollapsibleContent keepMounted className={cn("overflow-hidden", !isOpened && "max-h-32")}>
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[64px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto"
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
              : "inset-0 bg-linear-to-b from-background/30 to-background/90 p-2"
          )}
        >
          <CollapsibleTrigger render={<Button variant="subtle" className="h-8 text-xs" />}>
            {isOpened ? "Collapse" : expandButtonTitle}
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
