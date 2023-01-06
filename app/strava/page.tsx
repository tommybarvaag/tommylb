import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import StravaActivities from "@/components/strava/stravaActivities";
import StravaStats from "@/components/strava/stravaStats";
import Text from "@/components/text";
import strava from "@/lib/strava";

export const revalidate = 60;

async function getStravaData() {
  const stats = await strava.getStats();
  const activities = await strava.get();

  return { stats, activities };
}

export default async function Strava() {
  const { stats, activities } = await getStravaData();

  return (
    <div className="relative container max-w-4xl">
      <Link
        href="/"
        className="absolute -left-[200px] hidden items-center justify-center xl:inline-flex"
        underline={false}
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.BackToHome className="mr-2 h-4 w-4" />
        Home
      </Link>
      <Heading
        as="pageHeading"
        data-animate
        style={{
          "--stagger": "1"
        }}
      >
        Strava activity
      </Heading>
      <Text
        data-animate
        style={{
          "--stagger": "2"
        }}
      >
        I like to keep moving. After years and years of football in my youth I've taken a liking of
        running with the occasional hike. To motivate myself I've set some running goals for the
        future and I hope I'll be able to reach them soon.
      </Text>
      <Text
        data-animate
        style={{
          "--stagger": "3"
        }}
      >
        Scroll down to view my goals, personal bests and struggles along the way.
      </Text>
      <StravaStats
        initialStats={stats}
        data-animate
        style={{
          "--stagger": "4"
        }}
      />
      <StravaActivities
        initialActivities={activities}
        data-animate
        style={{
          "--stagger": "5"
        }}
      />
    </div>
  );
}
