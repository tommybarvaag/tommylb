import * as React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactMeForm from "./contactMeForm";

export default function ContactMe({ location = "frontpage" }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_TOMMYLB_GOOGLE_RECAPTCHA_V3_SITE_KEY}
    >
      <ContactMeForm location={location} />
    </GoogleReCaptchaProvider>
  );
}
