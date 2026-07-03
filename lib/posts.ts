import { cacheLife } from "next/cache";

import { promises as fs } from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "app", "(main)", "post", "_posts");

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  shortDescription?: string;
};

// The post set is fixed per deployment — cache the filesystem read + local .mdx imports so
// Cache Components treats them as prerendered data, not uncached runtime IO. cacheLife("max")
// because the value only changes on a new build.
export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("max");

  const files = await fs.readdir(postsDirectory);

  return files.filter(file => file.endsWith(".mdx")).map(file => file.replace(/\.mdx$/, ""));
}

export async function getPosts(): Promise<PostListItem[]> {
  "use cache";
  cacheLife("max");

  const slugs = await getPostSlugs();
  const posts: PostListItem[] = [];

  for (const slug of slugs) {
    // Build-time read of a LOCAL module: mdxRs resolves this at compile time
    // (not uncached runtime IO). Path is relative to lib/posts.ts.
    const mod = await import(`../app/(main)/post/_posts/${slug}.mdx`);
    posts.push({
      slug,
      title: typeof mod.metadata?.title === "string" ? mod.metadata.title : slug,
      date: mod.meta?.date ?? "",
      shortDescription: mod.meta?.shortDescription ?? mod.metadata?.description ?? undefined
    });
  }

  return posts;
}

export async function getLastPosts(count: number): Promise<PostListItem[]> {
  const posts = await getPosts();

  return posts
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
