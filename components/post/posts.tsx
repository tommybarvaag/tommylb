import Heading from "../heading";
import Post from "./post";

type PostsProps = {
  title?: string;
  featured?: boolean;
  post: any;
};

export default function Posts({ title, featured = false, post, ...other }: PostsProps) {
  const heading = title ?? featured ? "Featured posts" : "All posts";

  return post?.length > 0 ? (
    <div className="w-full" {...other}>
      <Heading>{heading}</Heading>
      {post.map((post, index) => (
        <Post
          key={`post-${index}`}
          title={post?.frontMatter?.title}
          summary={post?.frontMatter?.excerpt}
          href={`/post/${post.slug}`}
          publishedAt={post?.frontMatter?.date}
        />
      ))}
    </div>
  ) : null;
}
