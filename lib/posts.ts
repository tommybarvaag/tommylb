import { promises as fs } from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "app", "(main)", "post", "_posts");

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  shortDescription?: string;
};

export async function getPosts(): Promise<PostListItem[]> {
  const files = await fs.readdir(postsDirectory);
  const posts: PostListItem[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const slug = file.replace(/\.mdx$/, "");
    // Build-time read of a LOCAL module: mdxRs resolves this at compile time
    // (not uncached runtime IO). Path is relative to lib/posts.ts.
    const mod = await import(`../app/(main)/post/_posts/${file}`);
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
