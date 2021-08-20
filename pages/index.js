import ContactMe from "@/components/contactMe";
import { TimelineFromBirthUntilNow } from "@/components/timeline";
import * as React from "react";
import Heading from "../components/heading";
import { Posts } from "../components/post";
import { LastStravaActivity } from "../components/strava";
import Text from "../components/text";
import { Layout } from "../layouts";
import { getAllFilesFrontMatter } from "../lib/fileSystem";
import strava from "../lib/strava";
import { getDefaultSeoDescription } from "../utils/seoUtils";

export default function Home({ initialActivities, post }) {
  return (
    <Layout>
      <div className="w-full mb-12">
        <Heading as="pageHeading">Hi, I'm Tommy Lunde Barvåg</Heading>
        <Text>{getDefaultSeoDescription()}</Text>
      </div>
      <Posts post={post} featured />
      <LastStravaActivity initialActivities={initialActivities} />
      <ContactMe />
      <TimelineFromBirthUntilNow heading="Timeline" />
    </Layout>
  );
}

export async function getStaticProps() {
  const activities = await strava.get();

  return {
    props: { initialActivities: activities, post: await getAllFilesFrontMatter("post") },
    revalidate: 1
  };
}
