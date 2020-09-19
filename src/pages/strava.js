import * as React from "react";
import { Text } from "theme-ui";
import Link from "../components/link";
import PageHeading from "../components/pageHeading";
import { StravaActivities } from "../components/strava";
import StravaStats from "../components/strava/stravaStats";
import { Layout } from "../layouts";
import stravaService from "../services/stravaService";

export default function Strava({ preloadedStats, preloadedActivities }) {
  return (
    <Layout>
      <PageHeading>Strava activity</PageHeading>
      <Text variant="p">
        I like to keep moving. After years and years of football in my youth I've taken a liking of
        running with the occasional hike. To motivate myself I've set some running goals for the
        future and I hope I'll be able to reach them soon.{" "}
        <Link href="blog/why-i-run">Read more about why I run</Link>.
      </Text>
      <Text variant="p">
        Scroll down to view my goals, personal bests and struggles along the way.
      </Text>
      <StravaStats preloadedStats={preloadedStats} />
      <StravaActivities preloadedActivities={preloadedActivities} />
    </Layout>
  );
}

export async function getStaticProps() {
  const stats = await stravaService.getAllStravaStats();
  const activities = await stravaService.getAllStravaActivities();

  return {
    props: { preloadedStats: stats, preloadedActivities: activities },
    revalidate: 1
  };
}
