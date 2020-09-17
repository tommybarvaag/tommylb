import { flat, min, sum } from "../utils/commonUtils";
import { getDateYear, parseDateISO } from "../utils/dateUtils";
import {
  convertKilometersPerSecondToMinutesPerKilometer,
  convertMetersPerSecondToKilometersPerSecond,
  convertMetersToKilometers,
  convertSecondsToHoursAndMinutes
} from "../utils/unitOfMeasurementUtils";

const getPersonalBest = (bestEfforts, name) => ({
  name,
  value: convertSecondsToHoursAndMinutes(
    min(
      bestEfforts
        .filter(bestEffort => bestEffort.pr_rank === 1 && bestEffort.name === name)
        .map(bestEffort => bestEffort.moving_time)
    )
  )
});

const createActivity = activity => {
  const kilometersPerSecond = convertMetersPerSecondToKilometersPerSecond(activity.average_speed);

  return {
    name: activity.name,
    distance: activity.distance,
    movingTime: activity.moving_time,
    type: activity.type,
    id: activity.id,
    calories: activity.calories,
    totalElevationGain: activity.total_elevation_gain,
    startDate: activity.start_date,
    startDateLocal: activity.start_date_local,
    locationCountry: activity.location_country,
    kudosCount: activity.kudos_count,
    averageSpeed: activity.average_speed,
    maxSpeed: activity.max_speed,
    hasHeartRate: activity.has_heartrate,
    averageHeartRate: activity.has_heartrate ? Math.ceil(activity.average_heartrate) : null,
    maxHeartRate: activity.has_heartrate ? activity.max_heartrate : null,
    sufferScore: activity.suffer_score,
    distanceInKilometers: convertMetersToKilometers(activity.distance, 2),
    formattedMovingTime: convertSecondsToHoursAndMinutes(activity.moving_time),
    kilometersPerSecond,
    minutesPerKilometer: convertKilometersPerSecondToMinutesPerKilometer(kilometersPerSecond),
    personalBests:
      activity.best_efforts
        ?.filter(x => x.pr_rank === 1)
        .map(personalBest => ({
          name: personalBest.name,
          distanceInKilometers: convertMetersToKilometers(personalBest.distance, 2),
          formattedMovingTime: convertSecondsToHoursAndMinutes(personalBest.moving_time)
        })) ?? []
  };
};

const createActivities = (activities = []) => activities.map(activity => createActivity(activity));

const createStats = (activities = []) => {
  const allActivities = activities.map(activity => {
    const startDate = parseDateISO(activity.start_date);
    return {
      ...activity,
      startDate,
      startDateYear: getDateYear(startDate)
    };
  });

  const allRunningActivities = allActivities.filter(activity => activity.type === "Run");

  const now = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;

  const allActivitiesThisYear = allActivities.filter(
    activity => activity.startDateYear === thisYear
  );

  const allRunningActivitiesThisYear = allActivitiesThisYear.filter(
    activity => activity.type === "Run"
  );

  const allActivitiesLastYear = allActivities.filter(
    activity => activity.startDateYear === lastYear
  );

  const allRunningActivitiesLastYear = allActivitiesLastYear.filter(
    activity => activity.type === "Run"
  );

  const allBestEfforts = flat(
    allActivities
      .filter(activity => activity.best_efforts?.length > 0)
      .map(activity => activity.best_efforts)
  );

  return {
    goals: [
      { name: "5k", value: convertSecondsToHoursAndMinutes(1230) },
      { name: "10k", value: convertSecondsToHoursAndMinutes(2580) },
      { name: "Half-Marathon", value: convertSecondsToHoursAndMinutes(6600) }
    ],
    personalBests: [
      getPersonalBest(allBestEfforts, "400m"),
      getPersonalBest(allBestEfforts, "1/2 mile"),
      getPersonalBest(allBestEfforts, "1k"),
      getPersonalBest(allBestEfforts, "1 mile"),
      getPersonalBest(allBestEfforts, "2 mile"),
      getPersonalBest(allBestEfforts, "5k"),
      getPersonalBest(allBestEfforts, "10k")
    ],
    allTime: {
      activityCount: allActivities.length,
      activityRunningCount: allRunningActivities.length,
      totalDistanceCovered: convertMetersToKilometers(
        sum(allActivities.map(activity => activity.distance)),
        0
      ),
      totalRunningDistanceCovered: convertMetersToKilometers(
        sum(allRunningActivities.map(activity => activity.distance)),
        0
      )
    },
    thisYear: {
      activityCount: allActivitiesThisYear.length,
      activityRunningCount: allRunningActivitiesThisYear.length,
      totalDistanceCovered: convertMetersToKilometers(
        sum(allActivitiesThisYear.map(activity => activity.distance)),
        0
      ),
      totalRunningDistanceCovered: convertMetersToKilometers(
        sum(allRunningActivitiesThisYear.map(activity => activity.distance)),
        0
      )
    },
    lastYear: {
      activityCount: allActivitiesLastYear.length,
      activityRunningCount: allRunningActivitiesLastYear.length,
      totalDistanceCovered: convertMetersToKilometers(
        sum(allActivitiesLastYear.map(activity => activity.distance)),
        0
      ),
      totalRunningDistanceCovered: convertMetersToKilometers(
        sum(allRunningActivitiesLastYear.map(activity => activity.distance)),
        0
      )
    }
  };
};

export default {
  createActivity,
  createActivities,
  createStats
};
