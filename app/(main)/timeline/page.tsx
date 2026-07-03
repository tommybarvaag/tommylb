import type { Metadata } from "next";

import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { TimelineFromBirthUntilNow } from "@/components/timeline";

import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";

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
        <Heading variant="h1" noMargin className="text-lg font-semibold">
          This is my timeline from birth until now
        </Heading>
        <Text noMargin className="pt-1 text-sm text-muted-foreground">
          Read along this timeline to get to know me a little better.
        </Text>
      </div>
      <TimelineFromBirthUntilNow showAll />
    </>
  );
}
