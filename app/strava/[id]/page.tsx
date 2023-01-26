import Heading from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { StravaActivityKudos } from "@/components/strava/strava-activity-kudos";
import Text from "@/components/text";
import { planetScale } from "@/lib/planetscale";
import "@/styles/mdx.css";
import { getFormattedLongDate } from "@/utils/date-utils";
import { Prisma, StravaActivity } from "@prisma/client";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-static";
export const fetchCache = "force-cache";
export const preferredRegion = "edge";

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
      {`I participated in an ${activity.name}. The activity was located in ${activity.locationCountry} and lasted for a moving time of ${activity.formattedMovingTime}. During this time, I had an average heart rate of ${activity.averageHeartRate} beats per minute and a maximum heart rate of ${activity.maxHeartRate} beats per minute. My suffer score for this activity was ${activity.sufferScore} and I burned a total of ${activity.calories} calories.`}
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
      <HistoryBackLink
        href="/strava"
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        Strava activities
      </HistoryBackLink>
      <div>
        <Heading
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          {activity.name}
        </Heading>
        <div className="mb-4 flex items-center justify-between">
          <StravaActivityKudos
            activityId={activity.id}
            kudosCount={activity.kudosCount}
            data-animate
            style={{
              "--stagger": "2"
            }}
          />
          <div
            className="text-sm text-zinc-500"
            data-animate
            style={{
              "--stagger": "3"
            }}
          >
            {getFormattedLongDate(activity.startDateLocal)}
          </div>
        </div>
        <ActivityDescription
          activity={activity}
          data-animate
          style={{
            "--stagger": "4"
          }}
        />
      </div>
    </article>
  );
}
