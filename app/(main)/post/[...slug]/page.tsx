import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { Mdx } from "@/components/mdx/mdx";
import { PostViewCount } from "@/components/post";
import Text from "@/components/text";
import { allAuthors, allPosts } from "@/contentlayer/generated";
import { getTweets } from "@/lib/twitter";
import { formatDate, getAbsoluteUrl } from "@/lib/utils";
import "@/styles/mdx.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const slug = params?.slug?.join("/");
  const post = allPosts.find(post => post.slugAsParams === slug);

  if (!post) {
    return {};
  }

  const title = post?.title;

  const url = getAbsoluteUrl();

  const description = post?.description;

  const ogImageUrl = new URL(`${url}/api/og`);
  ogImageUrl.searchParams.set("heading", title);
  ogImageUrl.searchParams.set("type", "post");
  ogImageUrl.searchParams.set("mode", "dark");

  return {
    title: {
      default: title,
      template: "%s | Tommy Lunde Barvåg"
    },
    description,
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: ogImageUrl
    },
    openGraph: {
      title,
      type: "website",
      url: getAbsoluteUrl(),
      siteName: title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Tommy Lunde Barvåg."
        }
      ]
    }
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allPosts.map(post => ({
    slug: post.slugAsParams.split("/")
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");

  console.log("[POST SLUG:]:", slug, params?.slug?.join("/"));
  console.log("[POSTS:]", JSON.stringify(allPosts?.map(x => x.slug) ?? [], null, 2));

  const post = allPosts.find(post => post.slug === `/post/${slug}`);

  console.log(post.slug, `/post/${slug}`, post.slug === `/post/${slug}`);

  if (!post) {
    notFound();
  }

  const authors = post.authors.reduce(
    (accumulator, author) => {
      const foundAuthor = allAuthors.find(({ slug }) => slug === `/author/${author}`);
      if (foundAuthor) {
        accumulator.push(foundAuthor);
      }
      return accumulator;
    },
    [] as typeof allAuthors
  );

  const tweets = await getTweets(post.tweetIds);

  return (
    <article className="container relative max-w-3xl">
      <HistoryBackLink href="/post">See all posts</HistoryBackLink>
      <div>
        <Heading variant="h1" className="mb-8">
          {post.title}
        </Heading>
        <div className="flex items-center justify-between">
          {authors?.length ? (
            <div className="flex grow space-x-4">
              {authors.map(author => (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-4 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                  <div className="flex-1 items-center">
                    <Text className="mb-0 text-sm font-medium text-zinc-100" noMargin>
                      {author.title}
                    </Text>
                    <Text className="mb-0 text-[12px] text-zinc-300" noMargin>
                      @{author.twitter}
                    </Text>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
          {post.date && (
            <time
              dateTime={post.date}
              className="block max-w-[120px] shrink text-sm text-zinc-300 md:max-w-full"
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
          className="my-8 rounded-lg border border-zinc-200 bg-zinc-200 transition-colors group-hover:border-zinc-900"
        />
      )}
      <Mdx code={post.body.code} tweets={tweets} />
      <hr className="my-6 border-zinc-700" />
      <PostViewCount className="flex justify-end" slug={post.slugAsParams} />
    </article>
  );
}
