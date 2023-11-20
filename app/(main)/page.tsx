import { Heading } from "@/components/heading";
import Link from "@/components/link";
import Text from "@/components/text";
import { allPosts } from "@/contentlayer/generated";
import prisma from "@/lib/prisma";
import { getActiveWorkYears, getFormattedPostDate } from "@/utils/date-utils";
import { compareDesc } from "date-fns";

export const revalidate = 60;

async function getLastStravaActivity() {
  const activity = await prisma.stravaActivity.findMany({
    orderBy: {
      startDateLocal: "desc"
    },
    skip: 0,
    take: 3,
    select: {
      id: true,
      name: true,
      type: true,
      sufferScore: true,
      hasHeartRate: true,
      averageHeartRate: true,
      startDateLocal: true
    }
  });

  return activity;
}

function getLastPosts() {
  const posts = allPosts
    .filter(post => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 3);

  return posts;
}

export default async function Home() {
  const lastStravaActivity = await getLastStravaActivity();
  const lastPosts = getLastPosts();

  return (
    <>
      <div className="mb-12 w-full">
        <Heading
          variant="h1"
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
          <Text>
            I&apos;ve spent the <Link href="/cv/about">last {getActiveWorkYears()}</Link> creating
            web solutions for great companies. Experimenting with new technologies and learning new
            things is what I love the most.
          </Text>
          <Text>
            I&apos;m currently working as a senior consultant at{" "}
            <Link href="https://www.knowit.no/kontakt/selskap/knowit-experience-bergen-as/">
              knowit
            </Link>
            .
          </Text>
        </div>
      </div>
      <div
        className="mb-12 grid w-full justify-between gap-8 sm:grid-cols-3"
        data-animate
        style={{
          "--stagger": "3"
        }}
      >
        <div>
          <Heading className="mb-4 text-zinc-300">Building</Heading>
          <ul className="flex flex-col gap-6">
            <li key="list-element-kxb-app">
              <Link className="mb-1" href="https://kxb.app/">
                <Heading variant="h3" noMargin>
                  kxb.app
                </Heading>
              </Link>
              <Text variant="small" noMargin>
                A project for internal use{" "}
                <Link href="https://www.knowit.no/kontakt/selskap/knowit-experience-bergen-as/">
                  knowit
                </Link>
                . Estimating salary and more.
              </Text>
            </li>
            <li key="list-element-calendar-app">
              <Link className="mb-1" href="https://dato.im">
                <Heading variant="h3" noMargin>
                  dato.im
                </Heading>
              </Link>
              <Text variant="small" noMargin>
                Norwegian calendar with holidays and vacations.
              </Text>
            </li>
          </ul>
        </div>
        <div>
          <Heading className="mb-4 text-zinc-300">
            <Link href="/strava" underline={false}>
              Strava
            </Link>
          </Heading>
          <ul className="flex flex-col gap-6">
            {lastStravaActivity.map(activity => (
              <li key={activity.id}>
                <Link className="mb-1 block" href={`/strava/${activity.id}`}>
                  <Heading variant="h3" noMargin>
                    {getFormattedPostDate(activity.startDateLocal)}
                  </Heading>
                </Link>
                <Text variant="small" noMargin>
                  {`${activity.type} with a suffering score of ${
                    activity.sufferScore
                  } and an average heart rate of ${activity.averageHeartRate?.toString()}.`}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Heading className="mb-4 text-base text-zinc-300">
            <Link href="/post" underline={false}>
              Posts
            </Link>
          </Heading>
          <ul className="flex flex-col gap-6">
            {lastPosts.map(post => (
              <li key={post._id}>
                <Link className="mb-1 block" href={post.slug}>
                  <Heading variant="h3" noMargin>
                    {post.title}
                  </Heading>
                </Link>
                <Text variant="small" noMargin>
                  {post.shortDescription ?? post.description}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <Heading
          data-animate
          style={{
            "--stagger": "4"
          }}
        >
          Current
        </Heading>
        <Text
          data-animate
          style={{
            "--stagger": "5"
          }}
        >
          Developing skill through exploring and building, living for the bleeding edge. I&apos;m a
          big fan of the web and all the possibilities it offers.
        </Text>
        <Text
          data-animate
          style={{
            "--stagger": "6"
          }}
        >
          I love building websites and web applications. I excel at{" "}
          <Link href="https://www.typescriptlang.org/">TypeScript</Link>,{" "}
          <Link href="https://reactjs.org/">React</Link>,{" "}
          <Link href="https://nextjs.org/">Next.js</Link> and other modern web technologies.
        </Text>
        <Text
          data-animate
          style={{
            "--stagger": "7"
          }}
        >
          I spend my free time with my live-in girlfriend, daughter and son, coding hobby projects,
          taking runs around Bergen, and enjoying time with friends.
        </Text>
      </div>
      <div className="mb-12">
        <Heading
          data-animate
          style={{
            "--stagger": "8"
          }}
        >
          Connect
        </Heading>
        <Text
          data-animate
          style={{
            "--stagger": "9"
          }}
        >
          Reach out via my <Link href="/connect">contact form</Link>, find me on{" "}
          <Link href="https://www.linkedin.com/in/tommybarvaag/">LinkedIn</Link> or simply drop me
          an email at <Link href="mailto:tommy@barvaag.com">tommy@barvaag.com</Link>.
        </Text>
      </div>
    </>
  );
}
