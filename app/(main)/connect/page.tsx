import ContactMe from "@/components/contact-me";
import Heading from "@/components/heading";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  // generate a catchy "connect with me" description for SEO with 155-160 characters
  description:
    "Elevate your online presence with custom web development solutions. Let's bring your vision to life! Connect with me to build a website that engages and inspires.",
  openGraph: {
    ...defaultOg,
    title: "Connect",
    description:
      "Elevate your online presence with custom web development solutions. Let's bring your vision to life! Connect with me to build a website that engages and inspires."
  },
  twitter: {
    ...defaultTwitter,
    title: "Connect",
    description:
      "Elevate your online presence with custom web development solutions. Let's bring your vision to life! Connect with me to build a website that engages and inspires."
  }
};

export default async function ConnectPage() {
  return (
    <>
      <Heading as="h1">Connect</Heading>
      <ContactMe />
    </>
  );
}
