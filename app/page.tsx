import Heading from "@/components/heading";
import Link from "@/components/link";
import Text from "@/components/text";
import { allPosts } from "@/contentlayer/generated";
import prisma from "@/lib/prisma";
import { getFormattedPostDate } from "@/utils/dateUtils";
import { compareDesc } from "date-fns";

export const revalidate = 60;

async function getLastStravaActivity() {
  const activity = await prisma.stravaActivity.findMany({
    orderBy: {
      id: "desc"
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
          as="pageHeading"
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          Tommy Lunde Barvåg
        </Heading>
        <Text
          data-animate
          style={{
            "--stagger": "2"
          }}
        >
          I've spent the last nine years creating web solutions for great companies. Experimenting
          with new technologies and learning new things is what I love the most. I'm currently
          working as a senior consultant at{" "}
          <Link href="https://www.knowit.no/kontakt/selskap/knowit-experience-bergen-as/">
            @knowit
          </Link>
          .
        </Text>
      </div>
      <div
        className="grid sm:grid-cols-3 justify-between w-full gap-8 mb-12"
        data-animate
        style={{
          "--stagger": "3"
        }}
      >
        <div>
          <Heading className="text-gray-400">Building</Heading>
          <ul>
            <li>
              <Link className="mb-4" href="https://kxb.app/">
                <Heading variant="h3" noMargin>
                  kxb.app
                </Heading>
              </Link>
              <Text className="text-sm">
                A project for internal use @knowit. Estimating salary for consultants and more.
              </Text>
            </li>
            <li>
              <Link className="mb-4" href="https://github.com/tommybarvaag/norwegian-calendar">
                <Heading variant="h3" noMargin>
                  calendar.app
                </Heading>
              </Link>
              <Text className="text-sm">
                Hopefully a successor to <Link href="https://www.norskkalender.no/">nk.no</Link>{" "}
                Built with Next.js. No monetization, no ads, no tracking.
              </Text>
            </li>
            <li>
              <Link className="mb-4" href="https://github.com/tommybarvaag/name-party">
                <Heading variant="h3" noMargin>
                  name-party.app
                </Heading>
              </Link>
              <Text className="text-sm">
                A project for my son and daughter's name party. Featuring RSVP, guestbook, gift list
                and more. Built with Next.js 13 and RSC.
              </Text>
            </li>
          </ul>
        </div>
        <div>
          <Heading className="text-gray-400">Strava</Heading>
          <ul>
            {lastStravaActivity.map(activity => (
              <li key={activity.id}>
                <Link className="block mb-4" href={`/strava/${activity.id}`}>
                  <Heading variant="h3" noMargin>
                    {getFormattedPostDate(activity.startDateLocal)}
                  </Heading>
                </Link>
                <Text className="text-sm">
                  {`${activity.type} with a suffering score of ${
                    activity.sufferScore
                  } and an average heart rate of ${activity.averageHeartRate?.toString()}.`}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Heading className="text-gray-400 text-base">Posts</Heading>
          <ul>
            {lastPosts.map(post => (
              <li key={post._id}>
                <Link className="block mb-4" href={post.slug}>
                  <Heading variant="h3" noMargin>
                    {post.title}
                  </Heading>
                </Link>
                <Text className="text-sm">{post.description}</Text>
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
          Developing skill through exploring and building, living for the bleeding edge. I'm a big
          fan of the web and all the possibilities it offers.
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
