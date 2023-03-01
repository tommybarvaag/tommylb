import Heading from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { Mdx } from "@/components/mdx/mdx";
import { PostViewCount } from "@/components/post";
import Text from "@/components/text";
import { allAuthors, allPosts } from "@/contentlayer/generated";
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
    themeColor: "#18181b",
    viewport: {
      width: "device-width",
      initialScale: 1
    },
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
  }, [] as typeof allAuthors);

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
                <Link
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
                  <div className="flex-1 items-center">
                    <Text className="mb-0 text-sm font-medium text-zinc-100">{author.title}</Text>
                    <Text className="mb-0 text-[12px] text-zinc-300">@{author.twitter}</Text>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
          {post.date && (
            <time
              dateTime={post.date}
              className="block max-w-[120px] shrink text-sm text-zinc-300 md:max-w-full"
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
