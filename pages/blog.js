import { BlogPosts } from "../components/blog";
import useBlogPosts from "../components/blog/hooks/useBlogPosts";
import Heading from "../components/heading";
import { Layout } from "../layouts";
import { getAllFilesFrontMatter } from "../lib/fileSystem";

export default function Blog({ posts }) {
  const { blogPosts } = useBlogPosts({ initialData: posts });
  return (
    <Layout>
      <Heading as="pageHeading">Blog</Heading>
      <p variant="p">
        Late august 2020 I told myself that I should try to write more about what I do. Mainly in
        code but also day to day life. Since then I've written
        <p as="strong"> {blogPosts.length} </p>
        articles on this site. Let's see if it sticks.
      </p>
      <BlogPosts posts={blogPosts} featured />
      <BlogPosts posts={blogPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}
