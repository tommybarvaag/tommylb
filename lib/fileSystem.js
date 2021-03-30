import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getFormattedPostDate, parseDate } from "../utils/dateUtils";

const root = process.cwd();

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, "data", type));

  const allPosts = files
    .reduce((allPosts, postSlug) => {
      const source = fs.readFileSync(path.join(root, "data", type, postSlug), "utf8");
      const { data } = matter(source);
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

export function getFiles(type) {
  return fs.readdirSync(path.join(root, "data", type));
}
