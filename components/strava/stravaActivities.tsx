import { StravaActivityWithGearAndPersonalBests } from "@/lib/strava";
import * as React from "react";
import Button from "../button";
import Heading from "../heading";
import useStravaActivities from "./hooks";
import StravaActivity from "./stravaActivity";

type StravaActivitiesProps = {
  initialActivities: StravaActivityWithGearAndPersonalBests[];
};

export default function StravaActivities({
  initialActivities = [],
  ...other
}: StravaActivitiesProps) {
  const [activitiesToShow, setActivitiesToShow] = React.useState<number>(10);
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
    <div className="w-full my-6">
      <Heading as="h2">All Strava activities</Heading>
      {(activities ?? []).slice(0, activitiesToShow).map(activity => (
        <StravaActivity key={activity.id} activity={activity} />
      ))}
      <div className="flex justify-center mt-6">{renderShowAllActivitiesButton()}</div>
    </div>
  );
}
