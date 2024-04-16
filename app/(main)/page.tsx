import { ActiveWorkYears } from "@/components/active-work-years";
import { Heading } from "@/components/heading";
import Link from "@/components/link";
import Text from "@/components/text";
import { db } from "@/db/db";
import { stravaActivity } from "@/db/schema";
import { getPosts } from "@/lib/post";
import { getFormattedPostDate } from "@/utils/date-utils";
import { desc } from "drizzle-orm";

export const revalidate = 60;

async function getLastStravaActivity() {
  const activity = await db
    .select({
      id: stravaActivity.id,
      name: stravaActivity.name,
      type: stravaActivity.type,
      calories: stravaActivity.calories,
      hasHeartRate: stravaActivity.hasHeartRate,
      averageHeartRate: stravaActivity.averageHeartRate,
      startDateLocal: stravaActivity.startDateLocal,
      distanceInKilometers: stravaActivity.distanceInKilometers,
      formattedMovingTime: stravaActivity.formattedMovingTime
    })
    .from(stravaActivity)
    .orderBy(desc(stravaActivity.startDateLocal))
    .limit(3);

  return activity;
}

function getLastPosts() {
  const posts = getPosts()
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
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
            <ActiveWorkYears />
          </Text>
          <Text>
            I&apos;m currently working as a senior system developer at{" "}
            <Link href="https://investor.elmeragroup.no/">Elmera Group</Link>.
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
                    {getFormattedPostDate(new Date(activity.startDateLocal))}
                  </Heading>
                </Link>
                <Text variant="small" noMargin>
                  {`${
                    activity.type === "Workout"
                      ? `${activity.type} with ${activity.calories} calories burned and`
                      : `${
                          activity.distanceInKilometers
                        } km ${activity.type?.toLocaleLowerCase()} in ${activity.formattedMovingTime} minutes, with`
                  } an average heart rate of ${activity.averageHeartRate?.toString()}.`}
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
              <li key={post.slug}>
                <Link className="mb-1 block" href={`/post/${post.slug}`}>
                  <Heading variant="h3" noMargin>
                    {post.metadata.title}
                  </Heading>
                </Link>
                <Text variant="small" noMargin>
                  {post.metadata.shortDescription ?? post.metadata.description}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="mb-12"
        data-animate
        style={{
          "--stagger": "4"
        }}
      >
        <Heading>Current</Heading>
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
        className="mb-12"
        data-animate
        style={{
          "--stagger": "5"
        }}
      >
        <Heading>Connect</Heading>
        <Text>
          Reach out via my <Link href="/connect">contact form</Link>, find me on{" "}
          <Link href="https://www.linkedin.com/in/tommybarvaag/">LinkedIn</Link> or simply drop me
          an email at <Link href="mailto:tommy@barvaag.com">tommy@barvaag.com</Link>.
        </Text>
      </div>
    </>
  );
}
