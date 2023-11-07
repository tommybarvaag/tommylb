import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const textVariants = cva("[&:not(:first-child)]:mt-6", {
  variants: {
    variant: {
      default: "text-base leading-relaxed",
      small: "text-sm leading-normal [&:not(:first-child)]:mt-3"
    },
    noMargin: {
      true: "mt-0 [&:not(:first-child)]:mt-0"
    }
  }
});

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type TextProps = React.HtmlHTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants>;

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "default", noMargin = false, className, ...other }, ref) => {
    return (
      <p ref={ref} className={cn(textVariants({ variant, noMargin }), className)} {...other} />
    );
  }
);

Text.displayName = "Text";

export default Text;
