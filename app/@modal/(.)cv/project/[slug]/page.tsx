import { Suspense } from "react";

import { notFound } from "next/navigation";

import { ProjectExperience } from "@/components/project-experience";

import { projectExperienceData } from "@/data/project-experience-data";

async function InterceptedProjectExperience({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === slug
  );

  if (!projectExperience) {
    return notFound();
  }

  return <ProjectExperience projectExperience={projectExperience} isRouteIntercepted />;
}

export default function ProjectExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={null}>
      <InterceptedProjectExperience params={params} />
    </Suspense>
  );
}
