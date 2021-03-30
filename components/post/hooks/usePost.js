import * as React from "react";
import usePosts from "./usePosts";

export default function usePost(id) {
  const { posts } = usePosts();

  const post = React.useMemo(() => posts.find(post => post.slug === id));

  return { post };
}
