"use client";

import FormSubmitMessage from "@/components/form-submit-message";
import { Icons } from "@/components/icons";
import { SubmitButton } from "@/components/submit-button";
import TextArea from "@/components/text-area";
import TextField from "@/components/text-field";
import { sendFormAction } from "@/lib/actions/resend-actions";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { useFormState } from "react-dom";

type ContactMeFormProps = ComponentPropsWithoutRef<"div"> & {
  location: string;
};

export default function ContactMeForm({ className, location, ...other }: ContactMeFormProps) {
  const [state, formAction] = useFormState(sendFormAction, false);

  return (
    <div
      className={cn("relative mb-12 w-full max-w-md self-center overflow-hidden p-px", className)}
      {...other}
    >
      <form action={formAction}>
        <TextField
          id="full-name"
          name="fullName"
          label="Full name"
          type="text"
          placeholder="Your name"
          pattern="^[a-zA-Z ]+$"
          title="Only letters and spaces are allowed"
          required
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="your@domain.com"
          required
        />
        <TextArea id="message" name="message" label="Message" placeholder="My wishes..." required />
        <TextField id="location" name="location" label="Location" type="hidden" value={location} />
        <TextField className="form-text-field-phone" id="phone" name="phone" label="Phone" />
        <SubmitButton rightIcon={<Icons.Send className="size-5" />}>Send</SubmitButton>
        {state ? (
          <FormSubmitMessage
            text="I have recieved your inquiry and you'll hear from me soon."
            icon={<Icons.Check />}
          />
        ) : (
          <div className="h-[24px] w-full" />
        )}
      </form>
    </div>
  );
}
