"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useState } from "react";
import Button from "./button";
import FormSubmitMessage from "./form-submit-message";
import { Icons } from "./icons";
import TextArea from "./text-area";
import TextField from "./text-field";

type ContactMeFormProps = ComponentPropsWithoutRef<"div"> & {
  location: string;
};

export default function ContactMeForm({ className, location, ...other }: ContactMeFormProps) {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/mail", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.currentTarget?.fullName?.value,
        email: e.currentTarget?.email?.value,
        message: e.currentTarget?.message?.value,
        location: e.currentTarget?.location?.value,
        phone: e.currentTarget?.phone?.value
      })
    });

    // check if the response is successful
    if (response.ok) {
      setIsSubmitSuccessful(true);
    }
  }

  return (
    <div className={cn("mb-12 w-full max-w-md self-center", className)} {...other}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="full-name"
          name="fullName"
          type="text"
          label="Name"
          placeholder="Your name"
          pattern="^[a-zA-Z ]+$"
          title="Only letters and spaces are allowed"
          required
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="your@domain.com"
          required
        />
        <TextArea id="message" name="message" label="Message" placeholder="My wishes..." required />
        <TextField id="location" name="location" label="Location" type="hidden" value={location} />
        <TextField id="phone" name="phone" label="Phone" type="hidden" />
        <div>
          <Button type="submit" rightIcon={<Icons.Send className="h-5 w-5" />}>
            Send
          </Button>
          {isSubmitSuccessful ? (
            <FormSubmitMessage
              text="I have recieved your inquiry and you'll hear from me soon."
              icon={<Icons.Check />}
            />
          ) : (
            <div className="h-[24px] w-full" />
          )}
        </div>
      </form>
    </div>
  );
}
