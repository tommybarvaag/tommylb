import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import Link from "@/components/link";
import Text from "@/components/text";
import { formatMonthDay } from "@/lib/utils";
import { getPosts, type PostListItem } from "@/lib/posts";

export default async function PostPage() {
  const posts = await getPosts();

  const yearPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
    <div className="container relative max-w-4xl">
      <HistoryBackLink href="/">Home</HistoryBackLink>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <Heading variant="h1">Posts</Heading>
          <Text>Thoughts, ideas, and stories.</Text>
        </div>
      </div>
      <hr className="my-8 border-border" />
      {Object.entries(yearPosts).length ? (
        <div className="group">
          {Object.entries(yearPosts)
            .reverse()
            .map(([year, posts]) => (
              <div
                key={year}
                className="mb-8 flex justify-between gap-6 border-b-border pb-8 lg:gap-12 not-last:border-b"
              >
                <Text className="mb-0 self-start py-2 text-sm leading-7 text-muted-foreground">
                  {year}
                </Text>
                <ul className="grow items-center">
                  {posts.map(post => (
                    <li
                      key={`post-page-${post.slug}`}
                      className="border-b-border py-2 not-last:border-b"
                    >
                      <Link
                        href={`/post/${post.slug}`}
                        className="flex w-full gap-3"
                        underline={false}
                      >
                        <>
                          <Text
                            className="peer mb-0 grow transition-colors duration-300 hover:!text-foreground group-hover:text-muted-foreground"
                            noMargin
                          >
                            {post.title}
                          </Text>
                          <Text
                            className="my-0 min-w-[86px] text-right text-sm leading-7 text-muted-foreground transition-colors duration-300 peer-hover:!text-foreground"
                            noMargin
                          >
                            {formatMonthDay(post.date)}
                          </Text>
                        </>
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
