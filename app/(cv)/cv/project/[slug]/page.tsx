import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectExperience } from "@/components/project-experience";

import { projectExperienceData } from "@/data/project-experience-data";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";

interface ProjectExperienceProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return projectExperienceData.map(projectExperienceItem => ({
    slug: projectExperienceItem.slug
  }));
}

export async function generateMetadata({ params }: ProjectExperienceProps): Promise<Metadata> {
  const { slug } = await params;
  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === slug
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
  const { slug } = await params;
  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === slug
  );

  if (!projectExperience) {
    return notFound();
  }

  return <ProjectExperience projectExperience={projectExperience} />;
}
