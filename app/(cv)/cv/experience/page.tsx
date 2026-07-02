import type { Metadata } from "next";

import { CvKeyPoints } from "@/components/cv-key-points";

import { getActiveWorkYears } from "@/utils/date-utils";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";

export const metadata: Metadata = metadataWithCustomOgImage(
  "Experience",
  `With over ${getActiveWorkYears()} of experience, Tommy has developed a deep understanding of creating seamless user experiences.`,
  "Curriculum Vitae — Experience",
  "An experienced and solution-oriented senior consultant"
);

export default async function CurriculumVitae() {
  return (
    <div className="animate-in duration-500">
      <CvKeyPoints />
    </div>
  );
}
