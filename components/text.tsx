import { cn } from "@/lib/utils";
import * as React from "react";
import { PolymorphicPropsWithoutRef } from "types";

export const TextDefaultElement = "p";

// Component-specific props should be specified separately
type Props = {
  classname?: string;
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type TextProps<T extends React.ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithoutRef<Props, T>;

const Text = React.forwardRef(
  <T extends React.ElementType = typeof TextDefaultElement>(
    { children, as, className, ...other }: TextProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const Component: React.ElementType = as || TextDefaultElement;
    return (
      <Component
        ref={ref}
        className={cn("text-base leading-7 [&:not(:first-child)]:mt-6", className)}
        {...other}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export default Text;
