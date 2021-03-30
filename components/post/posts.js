import * as React from "react";
import Heading from "../heading";
import { usePosts } from "./hooks";
import Post from "./post";

export default function Posts({ title, featured, initialPosts, ...other }) {
  const { posts, featuredPosts } = usePosts({ initialData: initialPosts });

  const postsToRender = featured ? featuredPosts : posts;
  const heading = title ?? featured ? "Featured posts" : "All posts";

  return (
    <div className="w-full" {...other}>
      <Heading>{heading}</Heading>
      {postsToRender.map((post, index) => (
        <Post
          key={`post-${index}`}
          title={post.title}
          summary={post.summary}
          href={`/post/${post.slug}`}
          publishedAt={post.publishedAtDateFormatted}
        />
      ))}
    </div>
  );
}
