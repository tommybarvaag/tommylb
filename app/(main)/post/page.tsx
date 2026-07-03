import { getPosts, type PostListItem } from "@/lib/posts";
import { formatMonthDay } from "@/lib/utils";

import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import Link from "@/components/link";
import Text from "@/components/text";

export default async function PostPage() {
  const posts = await getPosts();

  const yearPosts = posts
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce(
      (accumulator, post) => {
        const year = `${new Date(post.date).getFullYear()}`;

        if (!accumulator[year]) {
          accumulator[year] = [];
        }

        accumulator[year].push(post);

        return accumulator;
      },
      {} as Record<string, PostListItem[]>
    );

  return (
    <div className="relative w-full">
      <div className="flex items-baseline justify-between gap-4">
        <HistoryBackLink href="/" className="mb-0 xl:static xl:left-auto">
          Home
        </HistoryBackLink>
        <Text noMargin className="text-sm text-olive-500 dark:text-olive-300">
          {`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        </Text>
      </div>
      <div className="mt-8">
        <Heading variant="h1" noMargin className="text-lg font-semibold">
          Posts
        </Heading>
        <Text noMargin className="pt-1 text-sm text-muted-foreground">
          Thoughts, ideas, and stories.
        </Text>
      </div>
      <hr className="mt-7 mb-0 border-border" />
      {Object.entries(yearPosts).length ? (
        <div>
          {Object.entries(yearPosts)
            .reverse()
            .map(([year, postsInYear]) => (
              <div
                key={year}
                className="grid grid-cols-[4rem_1fr] gap-x-8 border-b border-border py-1"
              >
                <Text
                  noMargin
                  className="pt-3 text-sm text-olive-500 tabular-nums dark:text-olive-300"
                >
                  {year}
                </Text>
                <ul>
                  {postsInYear.map(post => (
                    <li
                      key={`post-page-${post.slug}`}
                      className="not-first:border-t not-first:border-muted"
                    >
                      <Link
                        href={`/post/${post.slug}`}
                        underline={false}
                        className="flex w-full items-baseline justify-between gap-4 py-3"
                      >
                        <span className="font-medium text-foreground hover:underline hover:decoration-olive-400 hover:underline-offset-[3px]">
                          {post.title}
                        </span>
                        <span className="min-w-[86px] text-right text-sm text-olive-500 tabular-nums dark:text-olive-300">
                          {formatMonthDay(post.date)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <Text>No posts published.</Text>
      )}
    </div>
  );
}
