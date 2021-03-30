import * as React from "react";
import Heading from "../heading";
import BlogPost from "./blogPost";
import useBlogPosts from "./hooks/useBlogPosts";

export default function BlogPosts({ title, featured, posts, ...other }) {
  const { blogPosts, featuredBlogPosts } = useBlogPosts({ initialData: posts });

  const postsToRender = featured ? featuredBlogPosts : blogPosts;
  const heading = title ?? featured ? "Featured blog posts" : "All blog posts";

  return (
    <div className="w-full" {...other}>
      <Heading>{heading}</Heading>
      {postsToRender.map((blogPost, index) => (
        <BlogPost
          key={`blog-post-${index}`}
          title={blogPost.title}
          summary={blogPost.summary}
          href={`/blog/${blogPost.slug}`}
          publishedAt={blogPost.publishedAtDateFormatted}
        />
      ))}
    </div>
  );
}
