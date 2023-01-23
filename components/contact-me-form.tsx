"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm, useFormState } from "react-hook-form";
import { validateEmail } from "../utils/form-validation-utils";
import Button from "./button";
import FormSubmitMessage from "./form-submit-message";
import Heading from "./heading";
import { Icons } from "./icons";
import Text from "./text";
import TextArea from "./text-area";
import TextField from "./text-field";

type ContactMeFormProps = {
  location: string;
};

export default function ContactMeForm({ location }: ContactMeFormProps) {
  const { handleSubmit, register, control } = useForm();
  const { errors } = useFormState({ control });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [googleReCaptchaVerifyFailure, setGoogleReCaptchaVerifyFailure] = useState(false);

  async function onSubmit(values) {
    const result = await executeRecaptcha(location);

    const response = await fetch("/api/recaptcha", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: result
      })
    });

    const googleReCaptchaVerify = await response.json();

    if (googleReCaptchaVerify.success && googleReCaptchaVerify.score > 0.5) {
      const response = await fetch("/api/mail", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      setIsSubmitSuccessful(response.status === 202);
    } else {
      setGoogleReCaptchaVerifyFailure(true);
    }
  }

  return (
    <div className="mb-12 max-w-md self-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Contact me</Heading>
        <TextField
          id="name"
          name="name"
          type="text"
          label="Name"
          placeholder="Your name"
          error={!!errors.name}
          {...register("name", {
            required: true
          })}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="your@domain.com"
          error={!!errors.email}
          helperText={
            !!errors.email && errors.email.type?.toString() === "email"
              ? errors.email?.message?.toString()
              : "Required"
          }
          {...register("email", {
            required: true,
            validate: {
              email: value => validateEmail(value) || "Email must be valid. Ex: your@domain.com"
            }
          })}
        />
        <TextArea
          id="message"
          name="message"
          label="Message"
          placeholder="My wishes..."
          error={!!errors.message}
          {...register("message", {
            required: true
          })}
        />
        <TextField
          id="location"
          name="location"
          label="Location"
          type="hidden"
          value={location}
          {...register("location")}
        />
        <div>
          <Button type="submit" rightIcon={<Icons.Send className="h-5 w-5" />}>
            Send
          </Button>
          <Text className="text-xs">
            This page is protected with reCAPTCHA and Google&apos;s{" "}
            <a className="underline" href="https://policies.google.com/privacy">
              privacy rules
            </a>
            .{" "}
            <a className="underline" href="https://policies.google.com/terms">
              Terms
            </a>{" "}
            apply.
          </Text>
          {isSubmitSuccessful ? (
            <FormSubmitMessage
              text="I have recieved your inquiry and you'll hear from me soon."
              icon={<Icons.Check />}
            />
          ) : null}
          {googleReCaptchaVerifyFailure ? (
            <FormSubmitMessage
              text="reCAPTCHA stopped the message from being sent. If this was an error then please reach out to me via the links in my footer."
              icon={<Icons.X />}
            />
          ) : null}
        </div>
      </form>
    </div>
  );
}