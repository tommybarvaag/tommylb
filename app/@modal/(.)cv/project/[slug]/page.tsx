import { projectExperienceData } from "@/app/(cv)/cv/_data/project-experience-data";
import { ProjectExperience } from "@/app/@modal/_components/project-experience";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projectExperienceData.map(projectExperienceItem => ({
    slug: projectExperienceItem.slug
  }));
}

export const metadata: Metadata = {
  title: "Project Experience",
  // generate a curriculum vitae description for SEO with 155-160 characters
  //
  description: "",
  openGraph: {
    ...defaultOg,
    title: "Project Experience",
    description: ""
  },
  twitter: {
    ...defaultTwitter,
    title: "Project Experience",
    description: ""
  }
};

interface ProjectExperienceProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
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
