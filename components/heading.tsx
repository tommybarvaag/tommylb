import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HtmlHTMLAttributes, forwardRef } from "react";

const headingVariants = cva("text-zinc-50 mb-8", {
  variants: {
    variant: {
      h1: "font-normal tracking-tight text-base",
      h2: "font-normal tracking-tight text-base",
      h3: "font-normal tracking-tight text-base",
      h4: "font-normal tracking-tight text-base"
    },
    prose: {
      true: ""
    },
    noMargin: {
      true: "mb-0"
    }
  },
  compoundVariants: [
    {
      variant: "h1",
      prose: true,
      className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
    },
    {
      variant: "h2",
      prose: true,
      className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    },
    {
      variant: "h3",
      prose: true,
      className: "scroll-m-20 text-2xl font-semibold tracking-tight"
    },
    {
      variant: "h4",
      prose: true,
      className: "scroll-m-20 text-xl font-semibold tracking-tight"
    }
  ],
  defaultVariants: {
    variant: "h2"
  }
});

export type HeadingProps = HtmlHTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, variant, prose, noMargin, ...props }, ref) => {
    const Component: React.ElementType = variant || "h2";
    return (
      <Component
        className={cn(headingVariants({ variant, prose, noMargin }), className)}
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };
