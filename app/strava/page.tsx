import Heading from "@/components/heading";
import { StravaActivities } from "@/components/strava";
import StravaStats from "@/components/strava/stravaStats";
import Text from "@/components/text";
import strava from "@/lib/strava";

async function getStravaData() {
  const stats = await strava.getStats();
  const activities = await strava.get();

  return { stats, activities };
}

export default async function Strava() {
  const { stats, activities } = await getStravaData();

  return (
    <>
      <Heading as="pageHeading">Strava activity</Heading>
      <Text>
        I like to keep moving. After years and years of football in my youth I've taken a liking of
        running with the occasional hike. To motivate myself I've set some running goals for the
        future and I hope I'll be able to reach them soon.
      </Text>
      <Text>Scroll down to view my goals, personal bests and struggles along the way.</Text>
      <StravaStats initialStats={stats} />
      <StravaActivities initialActivities={activities} />
    </>
  );
}
