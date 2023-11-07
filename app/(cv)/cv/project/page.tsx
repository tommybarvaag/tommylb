import { projectExperienceData } from "@/data/project-experience-data";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projectExperienceData.map(projectExperienceItem => ({
    slug: projectExperienceItem.slug
  }));
}

export const metadata: Metadata = metadataWithCustomOgImage(
  "Project Experiences",
  "Working with several great companies and projects has given me a lot of experience in different areas. In collaboration with my clients, I have developed solutions that have helped them achieve their goals.",
  "Curriculum Vitae — Project Experiences",
  "An experienced and solution-oriented consultant"
);

export default async function ProjectExperiencesPage() {
  return <></>;
}
