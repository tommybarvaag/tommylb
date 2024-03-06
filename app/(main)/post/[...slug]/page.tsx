import { Mdx } from "@/app/mdx/mdx";
import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { Icons } from "@/components/icons";
import { PostViewCount } from "@/components/post";
import Text from "@/components/text";
import { getPosts } from "@/lib/post";
import { getTweets } from "@/lib/twitter";
import { formatDate, getAbsoluteUrl } from "@/lib/utils";
import { getHumanizedDateFromNow } from "@/utils/date-utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const slug = params?.slug?.join("/");
  const post = getPosts().find(post => post.slug === slug);

  if (!post) {
    return {};
  }

  const title = post.metadata.title;

  const url = getAbsoluteUrl();

  const description = post.metadata.description;

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
  return getPosts().map(post => ({
    slug: post.slug.split("/")
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");

  const post = getPosts().find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  const tweets = await getTweets(post.tweetIds);

  return (
    <article className="prose prose-zinc prose-invert container relative max-w-3xl">
      <HistoryBackLink href="/post">See all posts</HistoryBackLink>
      <div>
        <Heading variant="h1" className="mb-8">
          {post.metadata.title}
        </Heading>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-4 md:grow">
            <Link
              href={`https://twitter.com/tommybarvaag`}
              className="flex items-center space-x-4 text-sm no-underline"
            >
              <Image
                src="/images/tommy-zoom-256.webp"
                alt="Tommy Lunde Barvåg"
                width={42}
                height={42}
                className="rounded-full"
              />
              <div className="flex-1 items-center">
                <Text className="mb-0 text-sm font-medium text-zinc-100" noMargin>
                  Tommy Lunde Barvåg
                </Text>
                <Text className="mb-0 text-[12px] text-zinc-400" noMargin>
                  @tommybarvaag
                </Text>
              </div>
            </Link>
          </div>
          {post.metadata.date && (
            <div className="flex flex-col md:items-end">
              <time
                dateTime={post.metadata.date}
                className="block shrink text-sm text-zinc-300 md:max-w-full"
              >
                Published on {formatDate(post.metadata.date)}
              </time>
              <span className="text-[12px] text-zinc-400">
                {getHumanizedDateFromNow(new Date(post.metadata.date))} ago
              </span>
            </div>
          )}
        </div>
      </div>
      <Mdx source={post.content} tweets={tweets} />
      <hr className="my-6 border-zinc-700" />
      <Suspense fallback={<Icons.Spinner className="size-5" />}>
        <PostViewCount slug={post.slug} />
      </Suspense>
    </article>
  );
}
