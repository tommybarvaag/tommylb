import { getPosts } from "@/lib/posts";

import { projectExperienceData } from "@/data/project-experience-data";

export default async function sitemap() {
  const allPosts = await getPosts();
  const posts = allPosts.map(post => ({
    url: `https://tommylb.com/post/${post.slug}`,
    lastModified: post.date.split("T")[0]
  }));

  const projectExperience = projectExperienceData.map(project => ({
    url: `https://tommylb.com/cv/project/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  const routes = [
    "",
    "/post",
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
