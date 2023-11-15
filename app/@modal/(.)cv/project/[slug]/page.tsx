import { ProjectExperience } from "@/components/project-experience";
import { projectExperienceData } from "@/data/project-experience-data";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   return projectExperienceData.map(projectExperienceItem => ({
//     slug: projectExperienceItem.slug
//   }));
// }

interface ProjectExperienceProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProjectExperiencePage({ params }: ProjectExperienceProps) {
  const projectExperience = projectExperienceData.find(
    projectExperienceItem => projectExperienceItem.slug === params.slug
  );

  if (!projectExperience) {
    return notFound();
  }

  return <ProjectExperience projectExperience={projectExperience} isRouteIntercepted />;
}
