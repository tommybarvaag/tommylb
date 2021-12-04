import { getFormattedPostDate, parseDate } from "@/utils/dateUtils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import type { FileSystemPost, FrontMatterData } from "types";

const root = process.cwd();

export async function getAllFilesFrontMatter(
  type: string
): Promise<{ all: FileSystemPost[]; featured: FileSystemPost[] }> {
  const files = fs.readdirSync(path.join(root, "data", type));

  const allPosts = files
    .reduce<FileSystemPost[]>((allPosts: FileSystemPost[], postSlug: string) => {
      const source = fs.readFileSync(path.join(root, "data", type, postSlug), "utf8");
      const frontMatter = matter(source);
      const data: FrontMatterData = frontMatter.data as FrontMatterData;

      const publishedAtDate = parseDate(data.publishedAt, "yyyy-mm-dd");
      return [
        {
          ...data,
          slug: postSlug.replace(".mdx", ""),
          publishedAtDateFormatted: getFormattedPostDate(publishedAtDate)
        },
        ...allPosts
      ];
    }, [])
    .filter(post => post.published)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));

  return {
    all: allPosts.filter(post => !post.unlisted),
    featured: allPosts.filter(post => post.featured)
  };
}

export function getFiles(type: string): string[] {
  return fs.readdirSync(path.join(root, "data", type));
}
