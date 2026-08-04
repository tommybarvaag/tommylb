import { Suspense } from "react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPost, getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";

import { getHumanizedDateFromNow } from "@/utils/date-utils";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const description =
    typeof post.metadata.description === "string" ? post.metadata.description : undefined;

  return metadataWithCustomOgImage(post.title, description, "post");
}

async function PostContent({ params }: Pick<PostPageProps, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { Content, meta, title } = post;

  return (
    <>
      <div>
        <Heading variant="h1" className="mb-8 text-2xl font-semibold">
          {title}
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
                <p className="mb-0 text-sm font-medium text-foreground">Tommy Lunde Barvåg</p>
                <p className="mb-0 text-[12px] text-muted-foreground">@tommybarvaag</p>
              </div>
            </Link>
          </div>
          {meta.date ? (
            <div className="flex flex-col md:items-end">
              <time
                dateTime={meta.date}
                className="block shrink text-sm text-muted-foreground md:max-w-full"
              >
                Published on {formatDate(meta.date)}
              </time>
              <span className="text-[12px] text-muted-foreground">
                {getHumanizedDateFromNow(new Date(meta.date))} ago
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <Content />
    </>
  );
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <article className="relative container prose max-w-3xl prose-zinc dark:prose-invert">
      <HistoryBackLink href="/post">See all posts</HistoryBackLink>
      <Suspense>
        <PostContent params={params} />
      </Suspense>
    </article>
  );
}
