import * as React from "react";
import Heading from "../heading";
import Post from "./post";

export default function Posts({ title, featured, post, ...other }) {
  const postsToRender = featured ? post?.featured ?? [] : post?.all ?? [];
  const heading = title ?? featured ? "Featured posts" : "All posts";

  return postsToRender?.length > 0 ? (
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
  ) : null;
}
