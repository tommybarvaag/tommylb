import hydrate from "next-mdx-remote/hydrate";
import MDXComponents from "../../components/mdx/customComponents";
import PostLayout from "../../layouts";
import { getFileBySlug, getFiles } from "../../lib/mdx";

export default function Post({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents
  });

  return <PostLayout frontMatter={frontMatter}>{content}</PostLayout>;
}

export async function getStaticPaths() {
  const posts = await getFiles("post");

  return {
    paths: posts.map(p => ({
      params: {
        slug: p.replace(/\.mdx/, "")
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("post", params.slug);

  return { props: post };
}
