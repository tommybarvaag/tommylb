import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import StravaUnitOfMeasurement from "@/components/strava/strava-unit-of-measurement";
import Text from "@/components/text";
import { StravaActivityWithGearAndPersonalBests } from "@/lib/strava";
import { getFormattedLongDate } from "@/utils/date-utils";

type StravaActivitiesProps = {
  activity: StravaActivityWithGearAndPersonalBests;
};

export default function StravaActivity({ activity, ...other }: StravaActivitiesProps) {
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
      case "Workout":
        return (
          <>
            <StravaUnitOfMeasurement title="Time" value={activity.formattedMovingTime} />
            {renderHeartRate()}
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
    <Link
      className="mb-12 block w-full divide-y divide-white"
      href={`/strava/${activity.id}`}
      underline={false}
      {...other}
    >
      <div className="flex items-center">
        <Heading variant="h3" noMargin>
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
          <Heading variant="h3" noMargin>
            {`Personal best ${personalBest.name} (${personalBest.formattedMovingTime})`}
          </Heading>
        </div>
      ))}
      <div className="mt-4 flex flex-wrap pt-4">{renderStravaStats()}</div>
    </Link>
  );
}
