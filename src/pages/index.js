import * as React from "react";
import { Styled, Text, Heading } from "theme-ui";
import ContactForm from "../components/contactForm";
import { LastStravaActivity } from "../components/strava";
import Layout from "../layouts";
import { getAllStravaActivities } from "../lib/mongodb/dbConnection";
import PageHeading from "../components/pageHeading";

export default function Home({ preloadedActivities }) {
  return (
    <Layout>
      <PageHeading>Hi, I'm Tommy Lunde Barvåg</PageHeading>
      <Text>
        I’m a full stack developer. I’ve spent the last six years creating web solutions for great
        companies.
      </Text>
      <LastStravaActivity preloadedActivities={preloadedActivities} />
      <ContactForm />
    </Layout>
  );
}

export async function getStaticProps() {
  const activities = await getAllStravaActivities();
  return { props: { preloadedActivities: activities.map(({ _id, ...activity }) => activity) } };
}
