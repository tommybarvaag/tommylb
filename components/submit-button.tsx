import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormStatus } from "react-dom";

export type SubmitButtonProps = ComponentPropsWithoutRef<typeof Button>;

const SubmitButton = forwardRef<ElementRef<typeof Button>, SubmitButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Button
        className={cn("", className)}
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
