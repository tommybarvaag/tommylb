import { Text } from "theme-ui";
import { BlogPosts } from "../components/blog";
import useBlogPosts from "../components/blog/hooks";
import PageHeading from "../components/pageHeading";
import { Layout } from "../layouts";

export default function Blog() {
  const { blogPosts } = useBlogPosts();
  return (
    <Layout>
      <PageHeading>Blog</PageHeading>
      <Text variant="p">
        Late august 2020 I told myself that I should try to write more about what I do. Mainly in
        code but also day to day life. Since then I've written
        <Text as="strong"> {blogPosts.length} </Text>
        articles on this site. Let's see if it sticks.
      </Text>
      <BlogPosts featured />
      <BlogPosts />
    </Layout>
  );
}
