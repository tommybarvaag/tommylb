"use client";

import { cn } from "@/lib/utils";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { VariantProps, cva } from "class-variance-authority";
import { Fragment, ReactNode, forwardRef } from "react";

const drawerContentVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[1080px] rounded-t-[10px] bg-background",
  {
    variants: {
      variant: {
        default: "mt-24 h-[96%]",
        scrollable: "top-10 flex h-full flex-col"
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
  React.ComponentRef<typeof DrawerPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Popup> &
    VariantProps<typeof drawerContentVariants>
>(({ className, children, variant = "default", ...props }, ref) => {
  const DrawerContentWrapper: React.ElementType =
    variant === "scrollable" ? DrawerContentScrollable : Fragment;
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop className="fixed inset-0 z-40 bg-zinc-950/60" />
      <DrawerPrimitive.Viewport>
        <DrawerPrimitive.Popup
          ref={ref}
          className={cn(drawerContentVariants({ variant }), className)}
          {...props}
        >
          <DrawerContentWrapper>
            <div className="absolute left-1/2 top-3 z-60 h-2 w-[50px] -translate-x-1/2 rounded-full bg-muted" />
            {children}
          </DrawerContentWrapper>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
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
