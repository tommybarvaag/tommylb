import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import Link from "@/components/link";
import Text from "@/components/text";
import { getPosts } from "@/lib/post";
import { formatMonthDay } from "@/lib/utils";

export default async function PostPage() {
  const yearPosts = getPosts()
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .reduce(
      (accumulator, post) => {
        const year = `${new Date(post.metadata.date).getFullYear()}`;
        if (!accumulator[year]) {
          accumulator[year] = [];
        }
        accumulator[year].push(post);
        return accumulator;
      },
      {} as Record<string, ReturnType<typeof getPosts>>
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
      <hr className="my-8 border-zinc-700" />
      {Object.entries(yearPosts).length ? (
        <div className="group">
          {Object.entries(yearPosts)
            .reverse()
            .map(([year, posts]) => (
              <div
                key={year}
                className="mb-8 flex justify-between gap-6 border-b-zinc-700 pb-8 lg:gap-12 [&:not(:last-child)]:border-b"
              >
                <Text className="mb-0 self-start py-2 text-sm leading-7 text-zinc-500">{year}</Text>
                <ul className="grow items-center">
                  {posts.map(post => (
                    <li
                      key={`post-page-${post.slug}`}
                      className="border-b-zinc-700 py-2 [&:not(:last-child)]:border-b"
                    >
                      <Link
                        href={`/post/${post.slug}`}
                        className="flex w-full gap-3"
                        underline={false}
                      >
                        <>
                          <Text
                            className="peer mb-0 grow transition-colors duration-300 hover:!text-zinc-50 group-hover:text-zinc-500"
                            noMargin
                          >
                            {post.metadata.title}
                          </Text>
                          <Text
                            className="my-0 min-w-[86px] text-right text-sm leading-7 text-zinc-500 transition-colors duration-300 peer-hover:!text-zinc-50"
                            noMargin
                          >
                            {formatMonthDay(post.metadata.date)}
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
