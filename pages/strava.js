import * as React from "react";
import Heading from "../components/heading";
import Link from "../components/link";
import { StravaActivities } from "../components/strava";
import StravaStats from "../components/strava/stravaStats";
import Text from "../components/text";
import { Layout } from "../layouts";
import stravaService from "../services/stravaService";

export default function Strava({ initialStats, initialActivities }) {
  return (
    <Layout>
      <Heading as="pageHeading">Strava activity</Heading>
      <Text>
        I like to keep moving. After years and years of football in my youth I've taken a liking of
        running with the occasional hike. To motivate myself I've set some running goals for the
        future and I hope I'll be able to reach them soon.
        <Link href="/post/why-i-run" className="inline text-gray-500">
          {" "}
          Read more about why I run
        </Link>
        .
      </Text>
      <Text>Scroll down to view my goals, personal bests and struggles along the way.</Text>
      <StravaStats initialStats={initialStats} />
      <StravaActivities initialActivities={initialActivities} />
    </Layout>
  );
}

export async function getStaticProps() {
  const stats = await stravaService.getAllStravaStats();
  const activities = await stravaService.getAllStravaActivities();

  return {
    props: { initialStats: stats, initialActivities: activities },
    revalidate: 1
  };
}
