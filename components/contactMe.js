import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm, useFormState } from "react-hook-form";
import { validateEmail } from "../utils/formValidationUtils";
import Button from "./button";
import Heading from "./heading";
import { Fire } from "./icons";
import Text from "./text";
import TextArea from "./textArea";
import TextField from "./textField";

function FormSubmitMessage({ text }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring"
        }}
        status="success"
      >
        <div className="flex justify-center items-center p-4 space-x-4 border-gray-900 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="flex-initial">
            <Fire />
          </div>
          <div className="flex-initial">
            <Text className="text-sm" noMargin>
              {text}
            </Text>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ContactMeForm({ location }) {
  const { handleSubmit, register, control } = useForm();
  const { isSubmitSuccessful, errors } = useFormState({ control });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [googleReCaptchaVerifyFailure, setGoogleReCaptchaVerifyFailure] = React.useState(false);

  async function onSubmit(values) {
    const result = await executeRecaptcha(location);

    const response = await fetch("/api/googleReCaptchaVerify", {
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
      await fetch("/api/sendMail", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
    } else {
      setGoogleReCaptchaVerifyFailure(true);
    }
  }

  return (
    <div className="max-w-md self-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Contact me</Heading>
        <TextField
          name="name"
          type="text"
          label="Name"
          placeholder="Your name"
          error={errors.name}
          {...register("name", {
            required: true
          })}
        />
        <TextField
          name="email"
          type="email"
          label="Email"
          placeholder="your@domain.com"
          error={errors.email}
          helperText={
            errors.email && errors.email.type === "email" ? errors.email.message : "Required"
          }
          {...register("email", {
            required: true,
            validate: {
              email: value => validateEmail(value) || "Email must be valid. Ex: your@domain.com"
            }
          })}
        />
        <TextArea
          name="message"
          label="Message"
          placeholder="My wishes..."
          error={errors.message}
          {...register("message")}
        />
        <TextField name="location" type="hidden" value={location} {...register("location")} />
        <div>
          <Button type="submit">Send</Button>
          <Text className="text-xs">
            This page is protected with reCAPTCHA and Google's{" "}
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
            <FormSubmitMessage text="I have recieved your inquiry and you'll hear from me soon." />
          ) : null}
          {googleReCaptchaVerifyFailure ? (
            <FormSubmitMessage
              text="reCAPTCHA stopped the message from being sent. If this was an error then please
          follow the link to my LinkedIn page in the footer or email me via the footer link."
            />
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default function ContactMe({ location = "frontpage" }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_TOMMYLB_GOOGLE_RECAPTCHA_V3_SITE_KEY}
    >
      <ContactMeForm location={location} />
    </GoogleReCaptchaProvider>
  );
}
