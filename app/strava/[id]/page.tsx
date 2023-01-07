import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { planetScale } from "@/lib/planetscale";
import "@/styles/mdx.css";
import { getFormattedLongDate } from "@/utils/dateUtils";
import { Prisma, StravaActivity } from "@prisma/client";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-static";

interface StravaActivityPageProps {
  params: {
    id: string;
  };
}

async function getStravaActivity(id: string) {
  const { rows } = await planetScale.execute("SELECT * FROM StravaActivity WHERE ID = ?", [id]);

  if (!rows?.length) {
    return null;
  }

  const [stravaActivity] = rows;

  return stravaActivity as StravaActivity;
}

const ActivityDescription = ({
  activity,
  ...other
}: React.ComponentPropsWithoutRef<typeof Text> & {
  activity: Prisma.PromiseReturnType<typeof getStravaActivity>;
}) => {
  return (
    <Text {...other}>
      {`On ${getFormattedLongDate(activity.startDateLocal)}, I participated in an ${
        activity.name
      }. The activity was located in ${activity.locationCountry} and lasted for a moving time of ${
        activity.formattedMovingTime
      }. During this time, I had an average heart rate of ${
        activity.averageHeartRate
      } beats per minute and a maximum heart rate of ${
        activity.maxHeartRate
      } beats per minute. My suffer score for this activity was ${
        activity.sufferScore
      } and I burned a total of ${activity.calories} calories.`}
    </Text>
  );
};

export default async function StravaActivityPage({ params }: StravaActivityPageProps) {
  const activity = await getStravaActivity(params.id);

  if (!activity) {
    return notFound();
  }

  return (
    <article className="container relative max-w-3xl">
      <Link
        href="/strava"
        className="absolute -left-[200px] hidden items-center justify-center xl:inline-flex"
        underline={false}
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
        Strava activities
      </Link>
      <div>
        <Heading
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          {activity.name}
        </Heading>
        <ActivityDescription
          activity={activity}
          data-animate
          style={{
            "--stagger": "2"
          }}
        />
      </div>
    </article>
  );
}
