import ContactMe from "@/components/contactMe";
import Heading from "@/components/heading";
import { LastStravaActivity } from "@/components/strava";
import Text from "@/components/text";
import { TimelineFromBirthUntilNow } from "@/components/timeline";
import strava from "@/lib/strava";
import { isString } from "@/utils/commonUtils";
import { getDefaultSeoDescription } from "@/utils/seoUtils";

async function getStravaData() {
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

  return {
    initialActivities: lastStravaActivities
  };
}

export default async function Home() {
  const { initialActivities } = await getStravaData();

  return (
    <>
      <div className="mb-12 w-full">
        <Heading as="pageHeading">Hi, I'm Tommy Lunde Barvåg</Heading>
        <Text>{getDefaultSeoDescription()}</Text>
      </div>
      <LastStravaActivity initialActivities={initialActivities} />
      <ContactMe />
      <TimelineFromBirthUntilNow heading="Timeline" />
    </>
  );
}
