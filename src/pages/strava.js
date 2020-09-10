import * as React from "react";
import { Text } from "theme-ui";
import PageHeading from "../components/pageHeading";
import { StravaActivities } from "../components/strava";
import Layout from "../layouts";
import { getAllStravaActivities } from "../lib/mongodb/dbConnection";

export default function Strava({ preloadedActivities }) {
  return (
    <Layout>
      <PageHeading>Strava activity</PageHeading>
      <Text>I like to keep moving.</Text>
      <StravaActivities preloadedActivities={preloadedActivities} />
    </Layout>
  );
}

export async function getStaticProps() {
  const activities = await getAllStravaActivities();
  return { props: { preloadedActivities: activities.map(({ _id, ...activity }) => activity) } };
}
