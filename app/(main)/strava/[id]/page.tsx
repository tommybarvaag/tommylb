import { ActivityTypeTrend } from "@/app/(main)/strava/[id]/_components/activity-type-trend";
import { Heading } from "@/components/heading";
import { HistoryBackLink } from "@/components/history-back-link";
import { StravaActivityKudos } from "@/components/strava/strava-activity-kudos";
import Text from "@/components/text";
import { db } from "@/db/db";
import { SelectStravaActivity, stravaActivity } from "@/db/schema";
import { getFormattedLongDate } from "@/utils/date-utils";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface StravaActivityPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getStravaActivity(id: string) {
  return await db
    .select()
    .from(stravaActivity)
    .where(eq(stravaActivity.id, Number(id)))
    .get();
}

const ActivityDescription = ({
  activity,
  ...other
}: React.ComponentPropsWithoutRef<typeof Text> & {
  activity: SelectStravaActivity;
}) => {
  return (
    <Text {...other}>
      {`I participated in an ${activity.name}. The activity was located in ${
        activity.locationCountry === "Norge" ? "Norway" : activity.locationCountry
      } and lasted for a moving time of ${
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

export default async function StravaActivityPage({
  params,
  searchParams
}: StravaActivityPageProps) {
  const activity = await getStravaActivity(params.id);

  if (!activity) {
    return notFound();
  }

  return (
    <article className="container relative max-w-3xl">
      <HistoryBackLink href="/strava">Strava activities</HistoryBackLink>
      <div>
        <Heading>{activity.name}</Heading>
        <div className="mb-4 flex items-center justify-between">
          <StravaActivityKudos activityId={activity.id} kudosCount={activity.kudosCount} />
          <div className="text-sm text-zinc-500">
            {getFormattedLongDate(new Date(activity.startDateLocal))}
          </div>
        </div>
        <ActivityDescription activity={activity} />
        <Suspense fallback={<div></div>}>
          <ActivityTypeTrend activity={activity} year={searchParams?.year?.toString()} />
        </Suspense>
      </div>
    </article>
  );
}
