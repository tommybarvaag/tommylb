import { Container } from "theme-ui";
import ContainerHeading from "../containerHeading";
import BlogPost from "./blogPost";
import useBlogPosts from "./hooks";

export default function BlogPosts({ title, featured, ...other }) {
  const { blogPosts, featuredBlogPosts } = useBlogPosts();

  const posts = featured ? featuredBlogPosts : blogPosts;
  const containerHeading = title ?? featured ? "Featured blog posts" : "All blog posts";

  return (
    <Container {...other}>
      <ContainerHeading>{containerHeading}</ContainerHeading>
      {posts.map(blogPost => (
        <BlogPost
          key={blogPost.__resourcePath}
          title={blogPost.title}
          summary={blogPost.summary}
          href={`${blogPost.__resourcePath?.replace(".mdx", "")}`}
          publishedAt={blogPost.publishedAtDateFormatted}
        />
      ))}
    </Container>
  );
}
