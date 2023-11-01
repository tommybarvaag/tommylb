import Heading from "@/components/heading";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recommendation",
  description: "",
  openGraph: {
    ...defaultOg,
    title: "Recommendation",
    description: ""
  },
  twitter: {
    ...defaultTwitter,
    title: "Recommendation",
    description: ""
  }
};

export default async function Recommendation() {
  return (
    <div className="animate-in">
      <Heading as="h1">Recommendation</Heading>
    </div>
  );
}
