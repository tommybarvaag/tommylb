import MDXComponents from "@/components/mdx/customComponents";
import PostLayout from "@/layouts/postLayout";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";

export default function Post({ code, frontMatter }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <PostLayout frontMatter={frontMatter}>
      <Component
        components={{
          ...MDXComponents
        }}
      />
    </PostLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async context => {
  const posts = await getFiles("post");

  return {
    paths: posts.map(p => ({
      params: {
        slug: p.replace(/\.mdx/, "")
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug("post", params.slug);

  return { props: { ...post } };
};
