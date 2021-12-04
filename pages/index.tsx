import ContactMe from "@/components/contactMe";
import Heading from "@/components/heading";
import { Posts } from "@/components/post";
import { LastStravaActivity } from "@/components/strava";
import Text from "@/components/text";
import { TimelineFromBirthUntilNow } from "@/components/timeline";
import Layout from "@/layouts/layout";
import { getAllFilesFrontMatter } from "@/lib/fileSystem";
import strava from "@/lib/strava";
import { isString } from "@/utils/commonUtils";
import { getDefaultSeoDescription } from "@/utils/seoUtils";
import { GetStaticProps } from "next";
import * as React from "react";

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

export const getStaticProps: GetStaticProps = async () => {
  const activities = await strava.get();

  const lastStravaActivities = [];

  const lastActivity = activities?.find(activity => isString(activity.type));

  if (lastActivity) {
    lastStravaActivities.push(lastActivity);
  }

  const lastRunActivity = activities?.find(activity => activity.type === "Run");

  if (lastRunActivity) {
    lastStravaActivities.push(lastRunActivity);
  }

  const allPosts = await getAllFilesFrontMatter("post");

  return {
    props: {
      initialActivities: lastStravaActivities,
      post: {
        featured: allPosts.featured
      }
    },
    revalidate: 1
  };
};
