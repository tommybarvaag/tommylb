import { getLastPosts } from "@/lib/posts";

import { ActiveWorkYears } from "@/components/active-work-years";
import { Heading } from "@/components/heading";
import { IndexList, IndexListItem } from "@/components/index-list";
import Link from "@/components/link";
import { SectionLabel } from "@/components/section-label";
import Text from "@/components/text";

export default async function Home() {
  const lastPosts = await getLastPosts(3);

  return (
    <>
      <div className="mb-10 w-full">
        <Heading
          variant="h1"
          noMargin
          className="text-2xl font-semibold"
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          Tommy Lunde Barvåg
        </Heading>
        <div
          data-animate
          style={{
            "--stagger": "2"
          }}
        >
          <Text noMargin className="pt-2 text-sm text-muted-foreground">
            Senior system developer at{" "}
            <Link href="https://investor.elmeragroup.no/">Elmera Group</Link>
          </Text>
          <Text noMargin className="pt-5">
            <ActiveWorkYears />
          </Text>
        </div>
      </div>
      <section
        className="mb-10 w-full"
        data-animate
        style={{
          "--stagger": "3"
        }}
      >
        <SectionLabel>Building</SectionLabel>
        <IndexList>
          <IndexListItem
            index={1}
            title="kxb.app"
            href="https://kxb.app/"
            description="A project for internal use knowit. Estimating salary and more."
          />
          <IndexListItem
            index={2}
            title="dato.im"
            href="https://dato.im"
            description="Norwegian calendar with holidays and vacations."
          />
        </IndexList>
      </section>
      <section
        className="mb-10 w-full"
        data-animate
        style={{
          "--stagger": "4"
        }}
      >
        <SectionLabel>
          <Link href="/post" underline={false}>
            Posts
          </Link>
        </SectionLabel>
        <IndexList>
          {lastPosts.map((post, index) => (
            <IndexListItem
              key={post.slug}
              index={index + 1}
              title={post.title}
              href={`/post/${post.slug}`}
              description={post.shortDescription}
            />
          ))}
        </IndexList>
      </section>
      <div
        className="mb-10 w-full"
        data-animate
        style={{
          "--stagger": "5"
        }}
      >
        <SectionLabel className="mb-5">Current</SectionLabel>
        <Text>
          Developing skill through exploring and building, living for the bleeding edge. I&apos;m a
          big fan of the web and all the possibilities it offers.
        </Text>
        <Text>
          I love building websites and web applications. I excel at{" "}
          <Link href="https://www.typescriptlang.org/">TypeScript</Link>,{" "}
          <Link href="https://reactjs.org/">React</Link>,{" "}
          <Link href="https://nextjs.org/">Next.js</Link> and other modern web technologies.
        </Text>
        <Text>
          I spend my free time with my live-in girlfriend, daughter and son, coding hobby projects,
          taking runs around Bergen, and enjoying time with friends.
        </Text>
      </div>
      <div
        className="mb-10 w-full"
        data-animate
        style={{
          "--stagger": "6"
        }}
      >
        <SectionLabel className="mb-5">Connect</SectionLabel>
        <div className="flex flex-wrap gap-5 text-sm">
          <Link href="/connect">Contact form</Link>
          <Link href="https://www.linkedin.com/in/tommybarvaag/">LinkedIn</Link>
          <Link href="mailto:tommy@barvaag.com">tommy@barvaag.com</Link>
        </div>
      </div>
    </>
  );
}
