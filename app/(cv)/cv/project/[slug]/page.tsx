import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectExperience } from "@/components/project-experience";

import { getProjectExperience, projectExperienceData } from "@/data/project-experience-data";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";

type ProjectExperienceProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projectExperienceData.map(projectExperienceItem => ({
    slug: projectExperienceItem.slug
  }));
}

export async function generateMetadata({ params }: ProjectExperienceProps): Promise<Metadata> {
  const { slug } = await params;
  const projectExperience = getProjectExperience(slug);

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

async function ProjectExperienceContent({ params }: Pick<ProjectExperienceProps, "params">) {
  const { slug } = await params;
  const projectExperience = getProjectExperience(slug);

  if (!projectExperience) {
    return notFound();
  }

  return <ProjectExperience projectExperience={projectExperience} />;
}

export default function ProjectExperiencePage({ params }: ProjectExperienceProps) {
  return (
    <Suspense>
      <ProjectExperienceContent params={params} />
    </Suspense>
  );
}
