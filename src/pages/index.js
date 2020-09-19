import * as React from "react";
import { Text } from "theme-ui";
import { BlogPosts } from "../components/blog";
import ContactForm from "../components/contactForm";
import PageHeading from "../components/pageHeading";
import { LastStravaActivity } from "../components/strava";
import { Layout } from "../layouts";
import stravaService from "../services/stravaService";

export default function Home({ preloadedActivities }) {
  return (
    <Layout>
      <PageHeading>Hi, I'm Tommy Lunde Barvåg</PageHeading>
      <Text>
        I’m a full stack developer. I’ve spent the last six years creating web solutions for great
        companies.
      </Text>
      <BlogPosts featured />
      <LastStravaActivity preloadedActivities={preloadedActivities} />
      <ContactForm />
    </Layout>
  );
}

export async function getStaticProps() {
  const activities = await stravaService.getAllStravaActivities();

  return {
    props: { preloadedActivities: activities },
    revalidate: 1
  };
}
