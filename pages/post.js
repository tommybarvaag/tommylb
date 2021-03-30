import Heading from "../components/heading";
import { Posts } from "../components/post";
import { usePosts } from "../components/post/hooks";
import { Layout } from "../layouts";
import { getAllFilesFrontMatter } from "../lib/fileSystem";

export default function Post({ initialPosts }) {
  const { posts } = usePosts({ initialData: initialPosts });
  return (
    <Layout>
      <Heading as="pageHeading">Posts</Heading>
      <p variant="p">
        Late august 2020 I told myself that I should try to write more about what I do. Mainly in
        code but also day to day life. Since then I've written
        <p as="strong"> {posts.length} </p>
        articles on this site. Let's see if it sticks.
      </p>
      <Posts posts={posts} featured />
      <Posts posts={posts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const initialPosts = await getAllFilesFrontMatter("post");

  return { props: { initialPosts } };
}
