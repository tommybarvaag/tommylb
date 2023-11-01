import Heading from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { allAuthors } from "@/contentlayer/generated";
import Image from "next/image";

export default async function AuthorsPage() {
  return (
    <div className="container relative max-w-4xl">
      <HistoryBackLink
        href="/"
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.BackToHome className="mr-2 h-4 w-4" />
        Home
      </HistoryBackLink>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <Heading
            data-animate
            style={{
              "--stagger": "1"
            }}
          >
            Authors
          </Heading>
          <Text
            data-animate
            style={{
              "--stagger": "2"
            }}
          >
            A list of authors.
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
      {allAuthors?.length ? (
        <div
          className="mt-4 flex space-x-4"
          data-animate
          style={{
            "--stagger": "4"
          }}
        >
          {allAuthors.map(author => (
            <Link
              key={author._id}
              href={author.slug}
              className="flex items-center space-x-2 text-sm"
              underline={false}
            >
              <Image
                src={author.avatar}
                alt={author.title}
                width={42}
                height={42}
                className="rounded-full"
              />
              <div className="flex-1 text-left leading-tight">
                <Text className="font-medium text-zinc-100">{author.title}</Text>
                <Text className="text-[12px] text-zinc-300">@{author.twitter}</Text>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}