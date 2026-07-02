"use client";
import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

import { Button } from "@/components/button";
import { Icons } from "@/components/icons";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>
>(({ className, children, ...other }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm transition-all duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0" />
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      <DialogPrimitive.Popup
        ref={ref}
        className={cn(
          "fixed top-0 z-50 grid w-full gap-4 rounded-b-lg border border-border bg-background p-6 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:max-w-lg sm:rounded-lg lg:top-auto",
          className
        )}
        {...other}
      >
        {children}
        <DialogPrimitive.Close
          render={
            <Button
              className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
              variant="ghost"
            >
              <Icons.X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          }
        />
      </DialogPrimitive.Popup>
    </div>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...other }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...other} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...other }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...other}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...other }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...other}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...other }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...other}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
};
