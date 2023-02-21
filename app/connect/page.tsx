import ContactMe from "@/components/contact-me";
import Heading from "@/components/heading";
import { defaultOg } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect with me",
  openGraph: {
    ...defaultOg,
    title: "Connect",
    description: "Connect with me"
  }
};

export default async function ConnectPage() {
  console.log(defaultOg);
  return (
    <>
      <Heading as="h1">Connect</Heading>
      <ContactMe />
    </>
  );
}
