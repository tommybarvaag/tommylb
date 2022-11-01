import * as z from "zod";
import { createSource } from "./mdx";

export const Post = createSource({
  contentPath: "data/post",
  basePath: "/post",
  sortBy: "date",
  sortOrder: "desc",
  frontMatter: z.object({
    title: z.string(),
    date: z.string(),
    featured: z.boolean(),
    excerpt: z.string().optional()
  })
});
