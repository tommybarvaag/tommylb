import * as React from "react";
import ContactForm from "../components/contactForm";
import Heading from "../components/heading";
import { Posts } from "../components/post";
import { usePosts } from "../components/post/hooks";
import { LastStravaActivity } from "../components/strava";
import Text from "../components/text";
import { Layout } from "../layouts";
import { getAllFilesFrontMatter } from "../lib/fileSystem";
import stravaService from "../services/stravaService";

export default function Home({ initialActivities, initialPosts }) {
  const { posts } = usePosts({ initialData: initialPosts });

  return (
    <Layout>
      <div className="w-full mb-12">
        <Heading as="pageHeading">Hi, I'm Tommy Lunde Barvåg</Heading>
        <Text>
          I’m a full stack developer. I’ve spent the last six years creating web solutions for great
          companies.
        </Text>
      </div>
      <Posts posts={posts} featured />
      <LastStravaActivity initialActivities={initialActivities} />
      <ContactForm />
    </Layout>
  );
}

export async function getStaticProps() {
  const activities = await stravaService.getAllStravaActivities();

  return {
    props: { initialActivities: activities, initialPosts: await getAllFilesFrontMatter("post") },
    revalidate: 1
  };
}
