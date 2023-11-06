import { Heading } from "@/components/heading";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = metadataWithCustomOgImage(
  "Project Experiences",
  "Recommendation",
  "Curriculum Vitae — Recommendation",
  "An experienced and solution-oriented senior consultant"
);

export default async function Recommendation() {
  return (
    <div className="duration-500 animate-in">
      <Heading variant="h1">Recommendation</Heading>
    </div>
  );
}
