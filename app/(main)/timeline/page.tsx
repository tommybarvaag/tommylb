import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { TimelineFromBirthUntilNow } from "@/components/timeline";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "View my timeline from birth until now. Read along to get to know me a little better.",
  openGraph: {
    ...defaultOg,
    title: "Timeline",
    description:
      "View my timeline from birth until now. Read along to get to know me a little better."
  },
  twitter: {
    ...defaultTwitter,
    title: "Timeline",
    description:
      "View my timeline from birth until now. Read along to get to know me a little better."
  }
};

export default function Timeline() {
  return (
    <>
      <div className="mb-12 w-full">
        <Heading variant="h1">This is my timeline from birth until now</Heading>
        <Text>Read along this timeline to get to now me a little better.</Text>
      </div>
      <TimelineFromBirthUntilNow showAll heading={null} />
    </>
  );
}
