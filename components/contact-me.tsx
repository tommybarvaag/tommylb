"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactMeForm from "./contact-me-form";

type ContactMeProps = {
  location?: string;
};

export default function ContactMe({ location = "frontpage" }: ContactMeProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_TOMMYLB_GOOGLE_RECAPTCHA_V3_SITE_KEY}
      scriptProps={{
        defer: true
      }}
    >
      <ContactMeForm location={location} />
    </GoogleReCaptchaProvider>
  );
}
