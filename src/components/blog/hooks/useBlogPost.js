import * as React from "react";
import useBlogPosts from "./useBlogPosts";

export default function useBlogPost(id) {
  const { blogPosts } = useBlogPosts();

  const blogPost = React.useMemo(() => blogPosts.find(blogPost => blogPost.__resourcePath === id));

  return { blogPost };
}
