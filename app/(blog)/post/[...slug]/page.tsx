import { MdxContent } from "@/components/mdx/mdx-content";
import { Post } from "@/lib/mdx-sources";

// TODO: Properly type this file once the following fix lands.
// @see https://github.com/vercel/next.js/pull/42019
interface PostProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const files = await Post.getMdxFiles();

  return files?.map(file => ({
    slug: file.slug.split("/")
  }));
}

async function getPost(slug: string[]) {
  const post = await Post.getMdxNode(slug?.join("/"));
  return post;
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost(params.slug);

  return (
    <article className="mx-auto max-w-2xl py-12">
      <div className="flex flex-col space-y-2">
        <h1 className="max-w-[90%] text-base font-bold leading-normal">{post.frontMatter.title}</h1>
        {post.frontMatter.date && (
          <p className="text-sm text-slate-600">{post?.frontMatter?.date}</p>
        )}
      </div>
      <hr className="my-6" />
      <div className="max-w-none">
        <MdxContent source={post.mdx} />
      </div>
    </article>
  );
}
