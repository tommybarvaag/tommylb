import { projectExperienceData } from "@/data/project-experience-data";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projectExperienceData.map(projectExperienceItem => ({
    slug: projectExperienceItem.slug
  }));
}

export const metadata: Metadata = {
  title: "Project Experiences",
  // generate a curriculum vitae description for SEO with 155-160 characters
  //
  description: "",
  openGraph: {
    ...defaultOg,
    title: "Project Experiences",
    description: ""
  },
  twitter: {
    ...defaultTwitter,
    title: "Project Experiences",
    description: ""
  }
};

export default async function ProjectExperiencesPage() {
  return <></>;
}
