import Heading from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import StravaActivities from "@/components/strava/strava-activities";
import StravaStats from "@/components/strava/strava-stats";
import Text from "@/components/text";
import strava from "@/lib/strava";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Strava",
  description:
    "I like to keep moving. I usually play indoor football once a week and I like the occasional run or hike. Running while being a dad of two is not always easy but I hope I'll be able to reach my goals soon.",
  openGraph: {
    ...defaultOg,
    title: "Strava",
    description:
      "I like to keep moving. I usually play indoor football once a week and I like the occasional run or hike. Running while being a dad of two is not always easy but I hope I'll be able to reach my goals soon."
  },
  twitter: {
    ...defaultTwitter,
    title: "Strava",
    description:
      "I like to keep moving. I usually play indoor football once a week and I like the occasional run or hike. Running while being a dad of two is not always easy but I hope I'll be able to reach my goals soon."
  }
};

async function getStravaData() {
  const stats = await strava.getStats();
  const activities = await strava.get();

  return { stats, activities };
}

export default async function Strava() {
  const { stats, activities } = await getStravaData();

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
      <Heading
        as="pageHeading"
        data-animate
        style={{
          "--stagger": "1"
        }}
      >
        Strava activity
      </Heading>
      <Text
        data-animate
        style={{
          "--stagger": "2"
        }}
      >
        I like to keep moving. I usually play indoor football once a week and I like the occasional
        run or hike. Running while being a dad of two is not always easy but I hope I&apos;ll be
        able to reach my goals soon.
      </Text>
      <Text
        data-animate
        style={{
          "--stagger": "3"
        }}
      >
        Scroll down to view my goals, personal bests and struggles along the way.
      </Text>
      <StravaStats
        initialStats={stats}
        data-animate
        style={{
          "--stagger": "4"
        }}
      />
      <StravaActivities
        initialActivities={activities}
        data-animate
        style={{
          "--stagger": "5"
        }}
      />
    </div>
  );
}
