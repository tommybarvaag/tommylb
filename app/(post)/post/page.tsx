import Heading from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import Link from "@/components/link";
import Text from "@/components/text";
import { allPosts } from "@/contentlayer/generated";
import { formatMonthDay } from "@/lib/utils";
import { compareDesc } from "date-fns";

export default async function BlogPage() {
  const yearPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .reduce((accumulator, post) => {
      const year = `Year ${new Date(post.date).getFullYear()}`;
      if (!accumulator[year]) {
        accumulator[year] = [];
      }
      accumulator[year].push(post);
      return accumulator;
    }, {} as Record<string, typeof allPosts>);
  return (
    <div className="container relative max-w-4xl">
      <HistoryBackLink
        href="/"
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        Home
      </HistoryBackLink>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <Heading
            as="pageHeading"
            data-animate
            style={{
              "--stagger": "1"
            }}
          >
            Posts
          </Heading>
          <Text
            data-animate
            style={{
              "--stagger": "2"
            }}
          >
            A page for posts built using Contentlayer. Posts are written in MDX.
          </Text>
        </div>
      </div>
      <hr
        className="my-8 border-zinc-700"
        data-animate
        style={{
          "--stagger": "3"
        }}
      />
      {Object.entries(yearPosts).length ? (
        <div
          className=""
          data-animate
          style={{
            "--stagger": "4"
          }}
        >
          {Object.entries(yearPosts).map(([year, posts]) => (
            <div
              key={year}
              className="mb-8 flex justify-between gap-8 border-b-zinc-700 pb-8 [&:not(:last-child)]:border-b"
            >
              <Text className="mb-0 py-2">{year}</Text>
              <ul className="grow items-center">
                {posts.map(post => (
                  <li className="border-b-zinc-700 py-2 [&:not(:last-child)]:border-b">
                    <Link href={post.slug} className="group flex w-full gap-3" underline={false}>
                      <>
                        <Text className="mb-0 grow group-hover:underline">{post.title}</Text>
                        <Text className="mb-0 text-zinc-500">{formatMonthDay(post.date)}</Text>
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
