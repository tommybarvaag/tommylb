import { projectExperienceData } from "@/app/curriculum-vitae/_data/project-experience-data";
import Heading from "@/components/heading";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectExperience } from "../../_components/project-experience";

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

  return (
    <>
      <Heading as="h1">Project Experience</Heading>
      <ProjectExperience projectExperience={projectExperience} />
    </>
  );
}
