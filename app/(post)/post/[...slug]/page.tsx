import Heading from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { Mdx } from "@/components/mdx/mdx";
import { PostViewCount } from "@/components/post";
import Text from "@/components/text";
import { allAuthors, allPosts } from "@/contentlayer/generated";
import { formatDate } from "@/lib/utils";
import "@/styles/mdx.css";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allPosts.map(post => ({
    slug: post.slugAsParams.split("/")
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find(post => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  const authors = post.authors.reduce((accumulator, author) => {
    const foundAuthor = allAuthors.find(({ slug }) => slug === `/author/${author}`);
    if (foundAuthor) {
      accumulator.push(foundAuthor);
    }
    return accumulator;
  }, []);

  return (
    <article className="container relative max-w-3xl">
      <HistoryBackLink
        href="/post"
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        See all posts
      </HistoryBackLink>
      <div>
        <Heading
          as="pageHeading"
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          {post.title}
        </Heading>
        <div className="flex items-center justify-between">
          {authors?.length ? (
            <div
              className="flex grow space-x-4"
              data-animate
              style={{
                "--stagger": "3"
              }}
            >
              {authors.map(author => (
                <NextLink
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <Text className="mb-0 font-medium text-zinc-100">{author.title}</Text>
                    <Text className="mb-0 text-[12px] text-zinc-300">@{author.twitter}</Text>
                  </div>
                </NextLink>
              ))}
            </div>
          ) : null}
          {post.date && (
            <time
              dateTime={post.date}
              className="block max-w-[120px] shrink text-sm text-zinc-300"
              data-animate
              style={{
                "--stagger": "2"
              }}
            >
              Published on {formatDate(post.date)}
            </time>
          )}
        </div>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={840}
          height={450}
          className="my-8 rounded-md border border-zinc-200 bg-zinc-200 transition-colors group-hover:border-zinc-900"
          data-animate
          style={{
            "--stagger": "4"
          }}
        />
      )}
      <Mdx
        code={post.body.code}
        data-animate
        style={{
          "--stagger": "5"
        }}
      />
      <hr
        className="my-6 border-zinc-700"
        data-animate
        style={{
          "--stagger": "6"
        }}
      />
      <PostViewCount
        className="flex justify-end"
        slug={post.slugAsParams}
        data-animate
        style={{
          "--stagger": "7"
        }}
      />
    </article>
  );
}
