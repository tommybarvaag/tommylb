import * as React from "react";
import useSwr from "swr";
import { frontMatter } from "../../../pages/blog/**/*.mdx";

export default function useBlogPosts() {
  const { data } = useSwr("/api/blog-posts", async () => {}, {
    initialData: frontMatter,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false
  });

  const allBlogPosts = React.useMemo(
    () =>
      data
        .filter(blogPost => blogPost.published)
        .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))),
    [data]
  );

  const blogPosts = React.useMemo(() => allBlogPosts.filter(blogPost => !blogPost.unlisted), [
    allBlogPosts
  ]);

  const featuredBlogPosts = React.useMemo(() => blogPosts.filter(blogPost => blogPost.featured), [
    blogPosts
  ]);

  return { blogPosts, featuredBlogPosts };
}
