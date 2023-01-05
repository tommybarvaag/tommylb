import { StravaActivityWithGearAndPersonalBests } from "@/lib/strava";
import { getFormattedLongDate } from "../../utils/dateUtils";
import Heading from "../heading";
import { Icons } from "../icons";
import Text from "../text";
import StravaUnitOfMeasurement from "./stravaUnitOfMeasurement";

type StravaActivitiesProps = {
  activity: StravaActivityWithGearAndPersonalBests;
  linkToStravaPage?: boolean;
};

export default function StravaActivity({
  activity,
  linkToStravaPage = false,
  ...other
}: StravaActivitiesProps) {
  const renderHeartRate = () => {
    return activity.hasHeartRate ? (
      <StravaUnitOfMeasurement title="Heart rate " value={`${activity.averageHeartRate} bpm`} />
    ) : null;
  };

  const renderStravaStats = () => {
    switch (activity.type) {
      case "Run":
        return (
          <>
            <StravaUnitOfMeasurement title="Time" value={activity.formattedMovingTime} />
            <StravaUnitOfMeasurement
              title="Distance"
              value={`${activity.distanceInKilometers} km`}
            />
            {renderHeartRate()}
            <StravaUnitOfMeasurement title="Pace" value={`${activity.minutesPerKilometer} mpk`} />
            <StravaUnitOfMeasurement title="Speed" value={`${activity.kilometersPerHour} kph`} />
          </>
        );
      default:
        return (
          <>
            <StravaUnitOfMeasurement
              title="Distance"
              value={`${activity.distanceInKilometers} km`}
            />
            <StravaUnitOfMeasurement title="Time" value={activity.formattedMovingTime} />
            {renderHeartRate()}
            <StravaUnitOfMeasurement
              title="Elevation gain"
              value={`${activity.totalElevationGain} m`}
            />
          </>
        );
    }
  };

  return (
    <a
      className="mb-12 block w-full divide-y divide-white"
      href={linkToStravaPage ? "/strava" : "#"}
      {...other}
    >
      <div className="flex items-center">
        <Heading as="div" variant="h3" noMargin>
          {activity.type}
        </Heading>
        <Text className="mx-3" noMargin>
          -
        </Text>
        <Text noMargin>{getFormattedLongDate(new Date(activity.startDateLocal))}</Text>
      </div>
      {activity.personalBests.map((personalBest, index) => (
        <div
          className="mt-4 flex items-center pt-4"
          key={`strava-personal-best-${activity.id}-${index}`}
        >
          <Icons.Fire className="mr-3" />
          <Heading as="div" variant="h3" noMargin>
            {`Personal best ${personalBest.name} (${personalBest.formattedMovingTime})`}
          </Heading>
        </div>
      ))}
      <div className="mt-4 flex flex-wrap pt-4">{renderStravaStats()}</div>
    </a>
  );
}
