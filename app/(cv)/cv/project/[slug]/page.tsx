import { ProjectExperience } from "@/components/project-experience";
import { projectExperienceData } from "@/data/project-experience-data";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectExperienceProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  return projectExperienceData.map(projectExperienceItem => ({
    slug: projectExperienceItem.slug
  }));
}

export function generateMetadata({ params }: ProjectExperienceProps): Metadata {
  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === params.slug
  );

  if (!projectExperience) {
    return {};
  }

  const title = `${projectExperience.clientName} — ${projectExperience.title}`;

  return metadataWithCustomOgImage(
    title,
    projectExperience.summary,
    "Curriculum Vitae — Project experience",
    title
  );
}

export default async function ProjectExperiencePage({ params }: ProjectExperienceProps) {
  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === params.slug
  );

  if (!projectExperience) {
    return notFound();
  }

  return <ProjectExperience projectExperience={projectExperience} />;
}
