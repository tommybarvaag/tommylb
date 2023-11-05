import { CvKeyPoints } from "@/components/cv-key-points";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "",
  openGraph: {
    ...defaultOg,
    title: "Curriculum Vitae",
    description: ""
  },
  twitter: {
    ...defaultTwitter,
    title: "Curriculum Vitae",
    description: ""
  }
};

export default async function CurriculumVitae() {
  return (
    <div className="animate-in">
      <CvKeyPoints />
    </div>
  );
}
