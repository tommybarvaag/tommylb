import Heading from "@/components/heading";
import { Posts } from "@/components/post";
import Text from "@/components/text";
import { Post } from "@/lib/mdx-sources";

export default async function PostsPage() {
  const posts = await Post.getAllMdxNodes();

  return (
    <>
      <Heading as="pageHeading">Posts</Heading>
      <Text>
        Late august 2020 I told myself that I should try to write more about what I do. Mainly in
        code but also day to day life. Since then I've written
        <span className="font-bold"> {posts?.length} </span>
        articles on this site. Let's see if it sticks.
      </Text>
      <Posts post={posts} featured />
      <Posts post={posts} />
    </>
  );
}
