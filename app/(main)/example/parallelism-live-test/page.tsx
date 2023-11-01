import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import Link from "@/components/link";
import Text from "@/components/text";
import { Metadata } from "next";
import { Suspense } from "react";
import { ParallelismLiveTestExample } from "./_components/parallelism-live-test-example";

export const runtime = "experimental-edge";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
};

export default async function ParallelismLiveTest() {
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
      <Heading variant="h1">Parallelism live test</Heading>
      <Text>
        This page is used to test fetch in parallel with React Server Components. It lists two
        examples below. The first example is a React Server Component using Promise.allSettled and
        the second example is a React Server Component using async await.
      </Text>
      <Text>You can refresh the page to see the effect of the parallelism.</Text>
      <Text>
        Both examples is loading three promises that mocks the functionality of fetch with a delay
        of 1000 milliseconds. The first component utilizes Promise.allSettled to load the promises
        in parallel. The second component utilizes async await to load the promises.
      </Text>
      <Text>
        The first component should execute in approximately 1000 milliseconds. The second component
        should execute in approximately 3000 milliseconds.
      </Text>
      <div className="my-8">
        <Suspense fallback={<div />}>
          <ParallelismLiveTestExample />
        </Suspense>
      </div>
      <Text>
        This page is used as an interactive example to aid the post discussing{" "}
        <Link href="/post/parallelism-with-promises">parallelism with promises</Link>.
      </Text>
    </div>
  );
}
