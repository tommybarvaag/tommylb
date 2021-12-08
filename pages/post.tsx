import { GetStaticProps } from "next";
import Heading from "../components/heading";
import { Posts } from "../components/post";
import Text from "../components/text";
import { Layout } from "../layouts";
import { getAllFilesFrontMatter } from "../lib/fileSystem";

export default function Post({ post }) {
  return (
    <Layout>
      <Heading as="pageHeading">Posts</Heading>
      <Text>
        Late august 2020 I told myself that I should try to write more about what I do. Mainly in
        code but also day to day life. Since then I've written
        <span className="font-bold"> {post?.all?.length} </span>
        articles on this site. Let's see if it sticks.
      </Text>
      <Posts post={post} featured />
      <Posts post={post} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const post = await getAllFilesFrontMatter("post");

  return { props: { post: post } };
};
