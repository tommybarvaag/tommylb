"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Fragment, ReactNode, forwardRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const drawerContentVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 rounded-t-[10px] bg-zinc-900 mx-auto max-w-[1080px]",
  {
    variants: {
      variant: {
        default: "mt-24 h-[96%]",
        scrollable: "flex h-full top-10 flex-col"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const DrawerContentScrollable = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative z-10 flex-1 select-none overflow-y-auto rounded-t-[10px]">
      {children}
    </div>
  );
};

const DrawerContent = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> &
    VariantProps<typeof drawerContentVariants>
>(({ className, children, variant = "default", ...props }, ref) => {
  const DrawerContentWrapper: React.ElementType =
    variant === "scrollable" ? DrawerContentScrollable : Fragment;
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-40 bg-zinc-950/60" />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(drawerContentVariants({ variant }), className)}
        {...props}
      >
        <DrawerContentWrapper>
          <div className="z-60 absolute left-1/2 top-3 h-2 w-[50px] translate-x-[-50%] rounded-full bg-zinc-800" />
          {children}
        </DrawerContentWrapper>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
});
DrawerContent.displayName = "DrawerContent";

const Drawer = DrawerPrimitive.Root;
const DrawerClose = DrawerPrimitive.Close;
const DrawerTitle = DrawerPrimitive.Title;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerDescription = DrawerPrimitive.Description;

export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger };
