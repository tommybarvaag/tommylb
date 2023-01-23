import { cn } from "@/lib/utils";
import * as React from "react";
import { PolymorphicPropsWithoutRef } from "types";

export const TextDefaultElement = "p";

// Component-specific props should be specified separately
type Props = {
  classname?: string;
  noMargin?: boolean;
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type TextProps<T extends React.ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithoutRef<Props, T>;

const Text = <T extends React.ElementType = typeof TextDefaultElement>({
  children,
  as,
  className,
  noMargin = false,
  ...other
}: TextProps<T>) => {
  const Component: React.ElementType = as || TextDefaultElement;
  return (
    <Component
      className={cn(
        "leading-7 text-zinc-200",
        {
          "mb-4": !noMargin
        },
        className
      )}
      {...other}
    >
      {children}
    </Component>
  );
};

export default Text;
