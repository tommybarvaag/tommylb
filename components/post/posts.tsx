import * as React from "react";
import Heading from "../heading";
import Post from "./post";

type PostsProps = {
  title?: string;
  featured?: boolean;
  post: any;
};

export default function Posts({ title, featured = false, post, ...other }: PostsProps) {
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
