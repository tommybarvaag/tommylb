import { cache, type ReactNode } from "react";

import type { Metadata } from "next";
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

export type PostMeta = {
  date?: string;
  shortDescription?: string;
  authors?: string[];
};

export type PostModule = {
  Content: () => ReactNode;
  metadata: Metadata;
  meta: PostMeta;
  title: string;
};

// Do not use "use cache" here: that boundary requires serializable return values,
// and Content is a function (MDX component). React.cache only dedupes per request.
// Path is relative to lib/posts.ts; mdxRs resolves the import at compile time.
export const getPost = cache(async (slug: string): Promise<PostModule | null> => {
  try {
    const mod = await import(`../app/(main)/post/_posts/${slug}.mdx`);

    return {
      Content: mod.default,
      metadata: mod.metadata ?? {},
      meta: mod.meta ?? {},
      title: typeof mod.metadata?.title === "string" ? mod.metadata.title : slug
    };
  } catch {
    return null;
  }
});

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
    const post = await getPost(slug);

    if (!post) {
      continue;
    }

    posts.push({
      slug,
      title: post.title,
      date: post.meta.date ?? "",
      shortDescription: post.meta.shortDescription ?? post.metadata.description ?? undefined
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
