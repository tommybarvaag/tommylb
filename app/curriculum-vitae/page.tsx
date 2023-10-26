import Heading from "@/components/heading";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";
import { ProjectExperiences } from "./_components/project-experiences";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  // generate a curriculum vitae description for SEO with 155-160 characters
  //
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
    <>
      <Heading as="h1">Curriculum Vitae</Heading>
      <ProjectExperiences />
    </>
  );
}
