import * as React from "react";
import { Text } from "theme-ui";
import PageHeading from "../components/pageHeading";
import { StravaActivities } from "../components/strava";
import Layout from "../layouts";
import stravaService from "../services/stravaService";

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
  const activities = await stravaService.getAllStravaActivities();
  return { props: { preloadedActivities: activities } };
}
