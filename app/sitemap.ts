import { projectExperienceData } from "@/data/project-experience-data";
import { getPosts } from "@/lib/post";

export default async function sitemap() {
  const posts = getPosts().map(post => ({
    url: `https://tommylb.com${post.slug}`,
    lastModified: post.metadata.date.split("T")[0]
  }));

  const projectExperience = projectExperienceData.map(project => ({
    url: `https://tommylb.com/cv/project/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  const routes = [
    "",
    "/post",
    "/strava",
    "/connect",
    "/timeline",
    "/cv/about",
    "/cv/project",
    "/cv/experience",
    "/cv/recommendation"
  ].map(route => ({
    url: `https://tommylb.com${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...posts, ...projectExperience];
}
