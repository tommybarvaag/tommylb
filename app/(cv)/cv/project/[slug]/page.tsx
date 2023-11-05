import { ProjectExperience } from "@/components/project-experience";
import { projectExperienceData } from "@/data/project-experience-data";
import { getAbsoluteUrl } from "@/lib/utils";
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

  const title = projectExperience?.title;

  const url = getAbsoluteUrl();

  const description = projectExperience?.summary;

  const ogImageUrl = new URL(`${url}/api/og`);
  ogImageUrl.searchParams.set("heading", title);
  ogImageUrl.searchParams.set("type", "CV Project");
  ogImageUrl.searchParams.set("mode", "dark");

  return {
    title: {
      default: title,
      template: "%s | Tommy Lunde Barvåg"
    },
    description,
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: ogImageUrl
    },
    openGraph: {
      title,
      type: "website",
      url: getAbsoluteUrl(),
      siteName: title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Tommy Lunde Barvåg."
        }
      ]
    }
  };
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
