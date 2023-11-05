import { allPosts } from "@/.contentlayer/generated";
import { projectExperienceData } from "@/data/project-experience-data";

export default async function sitemap() {
  const posts = allPosts
    .filter(post => post.published)
    .map(post => ({
      url: `https://tommylb.com${post.slug}`,
      lastModified: post.date.split("T")[0]
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
    "/cv",
    "/cv/about",
    "/cv/project",
    "/cv/experience"
  ].map(route => ({
    url: `https://tommylb.com${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...posts, ...projectExperience];
}
