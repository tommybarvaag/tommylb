import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostSlugs } from "@/lib/posts";
import { formatDate, getAbsoluteUrl } from "@/lib/utils";

import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";

import { getHumanizedDateFromNow } from "@/utils/date-utils";
import { createOgImageUrl } from "@/utils/metadata-utils";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post: { metadata: Metadata };
  try {
    post = await import(`../_posts/${slug}.mdx`);
  } catch {
    return {};
  }

  const metadata = post.metadata ?? {};
  const title = typeof metadata.title === "string" ? metadata.title : slug;
  const description = metadata.description ?? undefined;
  const url = getAbsoluteUrl();
  const ogImageUrl = createOgImageUrl(title, "post", "dark");

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
      images: ogImageUrl.toString()
    },
    openGraph: {
      title,
      type: "website",
      url,
      siteName: "Tommy Lunde Barvåg",
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: "Tommy Lunde Barvåg."
        }
      ]
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let Post: (props: Record<string, never>) => React.ReactNode;
  let meta: { date?: string; shortDescription?: string; authors?: string[] };
  let metadata: Metadata;

  try {
    const mod = await import(`../_posts/${slug}.mdx`);
    Post = mod.default;
    meta = mod.meta ?? {};
    metadata = mod.metadata ?? {};
  } catch {
    notFound();
  }

  const title = typeof metadata.title === "string" ? metadata.title : slug;

  return (
    <article className="relative container prose max-w-3xl prose-zinc dark:prose-invert">
      <HistoryBackLink href="/post">See all posts</HistoryBackLink>
      <div>
        <Heading variant="h1" className="mb-8">
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
      <Post />
    </article>
  );
}
