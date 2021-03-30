import * as React from "react";
import { BlogPosts } from "../components/blog";
import useBlogPosts from "../components/blog/hooks/useBlogPosts";
import ContactForm from "../components/contactForm";
import Heading from "../components/heading";
import { LastStravaActivity } from "../components/strava";
import Text from "../components/text";
import { Layout } from "../layouts";
import { getAllFilesFrontMatter } from "../lib/fileSystem";
import stravaService from "../services/stravaService";

export default function Home({ preloadedActivities, posts }) {
  const { blogPosts } = useBlogPosts({ initialData: posts });

  return (
    <Layout>
      <div className="w-full mb-12">
        <Heading as="pageHeading">Hi, I'm Tommy Lunde Barvåg</Heading>
        <Text>
          I’m a full stack developer. I’ve spent the last six years creating web solutions for great
          companies.
        </Text>
      </div>
      <BlogPosts posts={blogPosts} featured />
      <LastStravaActivity preloadedActivities={preloadedActivities} />
      <ContactForm />
    </Layout>
  );
}

export async function getStaticProps() {
  const activities = await stravaService.getAllStravaActivities();

  return {
    props: { preloadedActivities: activities, posts: await getAllFilesFrontMatter("blog") },
    revalidate: 1
  };
}
