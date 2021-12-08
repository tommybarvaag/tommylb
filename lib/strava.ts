import stravaApi from "strava-v3";
import {
  StravaActivity,
  StravaGearSimple,
  StravaPersonalBest,
  StravaPersonalBestSimple,
  StravaStats
} from "types";
import { flat, groupBy, maxBy, min, sum } from "../utils/commonUtils";
import { getDateYear, parseDateISO } from "../utils/dateUtils";
import {
  convertKilometersPerSecondToMinutesPerKilometer,
  convertMetersPerSecondToKilometersPerSecond,
  convertMetersToKilometers,
  convertSecondsToHoursAndMinutes
} from "../utils/unitOfMeasurementUtils";
import redis from "./redis";

const DATABASE_NAME = "strava";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const client = async () => {
  const refreshTokenResponse = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.TLB_STRAVA_CLIENT_ID}&client_secret=${process.env.TLB_STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.TLB_STRAVA_REFRESH_TOKEN}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }
  ).then(response => response.json());

  return new stravaApi.client(refreshTokenResponse.access_token);
};

const getPersonalBest = (
  bestEfforts: StravaPersonalBest[],
  name: string
): StravaPersonalBestSimple => ({
  name,
  value: convertSecondsToHoursAndMinutes(
    min(
      bestEfforts
        .filter((bestEffort: StravaPersonalBest) => bestEffort.name === name)
        .map((bestEffort: StravaPersonalBest) => bestEffort.movingTime)
    )
  )
});

const getGear = (activities: StravaActivity[]): StravaGearSimple[] =>
  Object.entries(
    groupBy(
      activities
        .filter(x => x.gear && x.gear.name)
        .map(activity => ({
          name: activity.gear.name,
          primary: activity.gear.primary,
          distance: activity.gear.distance
        })),
      "name"
    )
  )
    .reduce((result, [key, value]) => {
      const uniqueGearWithMaxDistance = maxBy(value, "distance");
      return [
        ...result,
        {
          ...uniqueGearWithMaxDistance,
          name: key,
          distance: convertMetersToKilometers(uniqueGearWithMaxDistance.distance, 0)
        }
      ];
    }, [])
    .sort((a, b) => b.primary - a.primary);

const createActivity = (activity: any): StravaActivity => {
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
          distance: personalBest.distance,
          distanceInKilometers: convertMetersToKilometers(personalBest.distance, 2),
          movingTime: personalBest.moving_time,
          formattedMovingTime: convertSecondsToHoursAndMinutes(personalBest.moving_time)
        })) ?? [],
    gear: activity.gear
  };
};

const createStats = (activities = []): StravaStats => {
  const allActivities = activities.map(activity => {
    const startDate = parseDateISO(activity.startDate);
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
      .filter(activity => activity.personalBests?.length > 0)
      .map(activity => activity.personalBests)
  );

  return {
    goals: [
      { name: "5k", value: convertSecondsToHoursAndMinutes(1170) },
      { name: "10k", value: convertSecondsToHoursAndMinutes(2480) },
      { name: "Half-Marathon", value: convertSecondsToHoursAndMinutes(5700) },
      { name: "Marathon", value: convertSecondsToHoursAndMinutes(12000) }
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
    gear: getGear(allActivities),
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

const getById = async (id: string): Promise<StravaActivity> => {
  const activity = await redis.hget(DATABASE_NAME, id);

  if (!activity) {
    return null;
  }

  return JSON.parse(activity) as StravaActivity;
};

const create = async (id: string, entity: any): Promise<void> => {
  await redis.hset(DATABASE_NAME, id, JSON.stringify(createActivity(entity)));
};

const getAll = async (): Promise<StravaActivity[]> => {
  return (await redis.hvals(DATABASE_NAME))
    .map<StravaActivity>((entry: string) => {
      return JSON.parse(entry) as StravaActivity;
    })
    .sort(
      (a: StravaActivity, b: StravaActivity) =>
        new Date(b.startDateLocal).getTime() - new Date(a.startDateLocal).getTime()
    );
};

const getAllById = async (id: string, reCheck = false): Promise<StravaActivity> => {
  if (reCheck) {
    return (await client()).activities.get({
      id: id
    });
  }

  const activity: string = await redis.hget(DATABASE_NAME, id);

  if (!activity) {
    return null;
  }

  return JSON.parse(await redis.hget(DATABASE_NAME, id)) as StravaActivity;
};

const update = async (
  id: string,
  entity: StravaActivity | Partial<StravaActivity>
): Promise<void> => {
  const activity = await getAllById(id);

  await redis.hset(
    DATABASE_NAME,
    id,
    JSON.stringify({
      ...activity,
      ...entity,
      updatedAt: Date.now()
    })
  );
};

const getAndCreate = async (id: string): Promise<void> => {
  const activity = await getAllById(id, true);
  await create(id, activity);
};

const get = async () => await getAll();

const getStats = async (): Promise<StravaStats> => {
  return createStats(await getAll());
};

const remove = async (id: string): Promise<void> => {
  await redis.hdel(DATABASE_NAME, id);
};

const removeAll = async (): Promise<void> => {
  await redis.del(DATABASE_NAME);
};

const importActivities = async (): Promise<void> => {
  let page = 1;
  // Max per page is 200
  const perPage = 200;
  let activitiesToRetrieve = true;
  let activities = [];

  const stravaClient = await client();

  while (activitiesToRetrieve) {
    const result = await stravaClient.athlete.listActivities({
      page,
      per_page: perPage
    });

    activitiesToRetrieve = result !== null && result !== undefined && result.length === perPage;
    page++;

    if (result.length > 0) {
      activities = activities.concat(result);
    }
  }

  let detailedActivities = [];

  const importedActivities = await getAll();

  for (const activity of activities.filter(
    activity => !importedActivities.some(importedActivity => importedActivity.id === activity.id)
  )) {
    const detailedActivity = await stravaClient.activities.get({
      id: activity.id
    });

    if (stravaClient.rateLimiting.exceeded()) {
      const sixteenMinutesInFutureDate = new Date(new Date().getTime() + 16 * 60000);
      console.info(
        `Rate limit reached. Sleeping for 16 minutes... Should resume at ${sixteenMinutesInFutureDate.getHours()}:${sixteenMinutesInFutureDate.getMinutes()}`
      );
      await sleep(960000);
    }

    detailedActivities.push(detailedActivity);
  }

  for (const detailedActivity of detailedActivities) {
    const { id, ...rest } = detailedActivity;
    const now = Date.now();

    console.info(`Import activity with ID ${id}`);

    await create(detailedActivity.id, {
      id,
      createdAt: now,
      updatedAt: now,
      ...rest
    });
  }
};

const strava = {
  getById,
  create,
  update,
  getAndCreate,
  get,
  getStats,
  remove,
  removeAll,
  importActivities
};

export default strava;
