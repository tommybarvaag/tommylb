import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { join } from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export async function getFiles(type) {
  return readdirSync(join(process.cwd(), "data", type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? readFileSync(join(process.cwd(), "data", type, `${slug}.mdx`), "utf8")
    : readFileSync(join(process.cwd(), "data", `${type}.mdx`), "utf8");

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings
      ];
      return options;
    }
  });

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter
    }
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = readdirSync(join(process.cwd(), "data", type));

  return files.reduce((allPosts, postSlug) => {
    const source = readFileSync(join(process.cwd(), "data", type, postSlug), "utf8");
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", "")
      },
      ...allPosts
    ];
  }, []);
}
