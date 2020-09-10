import {
  convertKilometersPerSecondToMinutesPerKilometer,
  convertMetersPerSecondToKilometersPerSecond,
  convertMetersToKilometers,
  convertSecondsToHoursAndMinutes
} from "../utils/unitOfMeasurementUtils";

const createActivity = activity => {
  const kilometersPerSecond = convertMetersPerSecondToKilometersPerSecond(activity.average_speed);

  return {
    name: activity.name,
    distance: activity.distance,
    movingTime: activity.moving_time,
    type: activity.type,
    id: activity.id,
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

export default {
  createActivity
};
