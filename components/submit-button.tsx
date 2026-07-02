import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/button";

export type SubmitButtonProps = ComponentPropsWithoutRef<typeof Button>;

const SubmitButton = forwardRef<ElementRef<typeof Button>, SubmitButtonProps>(
  ({ className, children, ...props }, _ref) => {
    const { pending } = useFormStatus();

    return (
      <Button
        className={className}
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
