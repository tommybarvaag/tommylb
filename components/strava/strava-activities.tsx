"use client";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import useStravaActivities from "@/components/strava/hooks";
import StravaActivity from "@/components/strava/strava-activity";
import { StravaActivityWithGearAndPersonalBests } from "@/lib/strava";
import { ComponentPropsWithoutRef, useState } from "react";

type StravaActivitiesProps = ComponentPropsWithoutRef<"div"> & {
  initialActivities: StravaActivityWithGearAndPersonalBests[];
};

export default function StravaActivities({
  initialActivities = [],
  ...other
}: StravaActivitiesProps) {
  const [activitiesToShow, setActivitiesToShow] = useState<number>(10);
  const { activities } = useStravaActivities({
    fallbackData: initialActivities
  });

  const renderShowAllActivitiesButton = () => {
    if (activitiesToShow === activities?.length) {
      return null;
    }

    return (
      <Button onClick={() => setActivitiesToShow(activities.length)}>Show all activities</Button>
    );
  };

  return (
    <div className="my-6 w-full" {...other}>
      <Heading variant="h2">All Strava activities</Heading>
      {(activities ?? []).slice(0, activitiesToShow).map(activity => (
        <StravaActivity key={activity.id} activity={activity} />
      ))}
      <div className="mt-6 flex justify-center">{renderShowAllActivitiesButton()}</div>
    </div>
  );
}
