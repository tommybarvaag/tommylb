import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import StravaActivities from "@/components/strava/strava-activities";
import StravaStats from "@/components/strava/strava-stats";
import Text from "@/components/text";
import { query } from "@/lib/query";
import strava from "@/lib/strava";
import { defaultOg, defaultTwitter } from "@/utils/metadata-utils";
import type { Metadata } from "next";
import { Suspense } from "react";

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

export default async function Strava() {
  const [stats, activities] = await query([strava.getStats(), strava.get()]);

  return (
    <div className="container relative max-w-4xl">
      <HistoryBackLink href="/">Home</HistoryBackLink>
      <Heading variant="h1">Strava activity</Heading>
      <Text>
        I like to keep moving. I usually play indoor football once a week and I like the occasional
        run or hike. Running while being a dad of two is not always easy but I hope I&apos;ll be
        able to reach my goals soon.
      </Text>
      <Text>Scroll down to view my goals, personal bests and struggles along the way.</Text>
      <Suspense fallback={<div></div>}>
        <StravaStats stats={stats.data} />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <StravaActivities activities={activities.data} />
      </Suspense>
    </div>
  );
}
