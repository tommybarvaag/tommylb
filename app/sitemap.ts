import { allPosts } from "@/.contentlayer/generated";

export default async function sitemap() {
  const blogs = allPosts
    .filter(post => post.published)
    .map(post => ({
      url: `https://tommylb.com${post.slug}`,
      lastModified: post.date.split("T")[0]
    }));

  const routes = ["", "/post", "/strava", "/connect", "/timeline"].map(route => ({
    url: `https://tommylb.com${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...blogs];
}
