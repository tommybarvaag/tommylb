import { ProjectExperience } from "@/components/project-experience";
import { projectExperienceData } from "@/data/project-experience-data";
import { notFound } from "next/navigation";

export const runtime = "edge";

interface ProjectExperienceProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectExperiencePage({ params }: ProjectExperienceProps) {
  const { slug } = await params;
  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === slug
  );

  if (!projectExperience) {
    return notFound();
  }

  return <ProjectExperience projectExperience={projectExperience} isRouteIntercepted />;
}
