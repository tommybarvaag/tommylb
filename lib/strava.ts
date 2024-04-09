import { db } from "@/db/db";
import {
  InsertStravaActivity,
  InsertStravaGear,
  InsertStravaPersonalBest,
  SelectStravaActivity,
  SelectStravaGear,
  SelectStravaPersonalBest,
  stravaActivity,
  stravaGear,
  stravaPersonalBest
} from "@/db/schema";
import {
  StravaApiActivity,
  StravaGearSimple,
  StravaPersonalBest,
  StravaPersonalBestSimple,
  StravaStats
} from "@/types";
import { flat, groupBy, maxBy, min, sum } from "@/utils/common-utils";
import { getDateYear } from "@/utils/date-utils";
import {
  convertKilometersPerSecondToMinutesPerKilometer,
  convertMetersPerSecondToKilometersPerSecond,
  convertMetersToKilometers,
  convertSecondsToHoursAndMinutes
} from "@/utils/unit-of-measurement-utils";
import { and, eq, sql } from "drizzle-orm";
import stravaApi from "strava-v3";

export type StravaActivityWithGearAndPersonalBests = SelectStravaActivity & {
  gear: SelectStravaGear;
  personalBests: SelectStravaPersonalBest[];
};
export type StravaActivityWithGearAndPersonalBestsAndStartDateYear = Omit<
  StravaActivityWithGearAndPersonalBests,
  "startDate"
> & { startDate: Date; startDateYear: number };

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

const getGear = (
  activities: StravaActivityWithGearAndPersonalBestsAndStartDateYear[]
): StravaGearSimple[] =>
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
          distance: convertMetersToKilometers(+uniqueGearWithMaxDistance.distance, 0)
        }
      ];
    }, [])
    .sort((a, b) => b.primary - a.primary);

const createActivity = (activity: any): StravaApiActivity => {
  const kilometersPerSecond = convertMetersPerSecondToKilometersPerSecond(activity.average_speed);

  console.log(activity);
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
    gear: activity?.gear?.id
      ? {
          id: activity.gear.id,
          name: activity.gear.name,
          primary: activity.gear.primary,
          distance: activity.gear.distance,
          retired: activity.gear.retired,
          resource_state: activity.gear.resource_state,
          converted_distance: activity.gear.converted_distance,
          nickname: activity.gear.nickname
        }
      : undefined
  };
};

const createStats = (activities: StravaActivityWithGearAndPersonalBests[] = []): StravaStats => {
  const allActivities: StravaActivityWithGearAndPersonalBestsAndStartDateYear[] = activities.map(
    activity => {
      const startDate = new Date(activity.startDate);
      return {
        ...activity,
        startDate,
        startDateYear: getDateYear(startDate)
      };
    }
  );

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
      { name: "5k", value: convertSecondsToHoursAndMinutes(1190) },
      { name: "10k", value: convertSecondsToHoursAndMinutes(2480) },
      { name: "Half-Marathon", value: convertSecondsToHoursAndMinutes(6000) }
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
        sum(allActivities.map(activity => +activity.distance)),
        0
      ),
      totalRunningDistanceCovered: convertMetersToKilometers(
        sum(allRunningActivities.map(activity => +activity.distance)),
        0
      )
    },
    thisYear: {
      activityCount: allActivitiesThisYear.length,
      activityRunningCount: allRunningActivitiesThisYear.length,
      totalDistanceCovered: convertMetersToKilometers(
        sum(allActivitiesThisYear.map(activity => +activity.distance)),
        0
      ),
      totalRunningDistanceCovered: convertMetersToKilometers(
        sum(allRunningActivitiesThisYear.map(activity => +activity.distance)),
        0
      )
    },
    lastYear: {
      activityCount: allActivitiesLastYear.length,
      activityRunningCount: allRunningActivitiesLastYear.length,
      totalDistanceCovered: convertMetersToKilometers(
        sum(allActivitiesLastYear.map(activity => +activity.distance)),
        0
      ),
      totalRunningDistanceCovered: convertMetersToKilometers(
        sum(allRunningActivitiesLastYear.map(activity => +activity.distance)),
        0
      )
    }
  };
};

const getById = async (id: number) => {
  const { strava_activity, strava_gear } = await db
    .select()
    .from(stravaActivity)
    .leftJoin(stravaGear, eq(stravaActivity.stravaGearId, stravaGear.id))
    .where(eq(stravaActivity.id, id))
    .get();
  const personalBests = await db
    .select()
    .from(stravaPersonalBest)
    .where(eq(stravaPersonalBest.stravaActivityId, id));

  return {
    ...strava_activity,
    distance: +strava_activity.distance,
    distanceInKilometers: +strava_activity.distanceInKilometers,
    kilometersPerHour: +strava_activity.kilometersPerHour,
    minutesPerKilometer: +strava_activity.minutesPerKilometer,
    totalElevationGain: +strava_activity.totalElevationGain,
    averageSpeed: +strava_activity.averageSpeed,
    maxSpeed: +strava_activity.maxSpeed,
    averageHeartRate: strava_activity.averageHeartRate ? +strava_activity.averageHeartRate : null,
    maxHeartRate: strava_activity.maxHeartRate ? +strava_activity.maxHeartRate : null,
    sufferScore: strava_activity.sufferScore ? +strava_activity.sufferScore : null,
    calories: +strava_activity.calories,
    startDate: strava_activity.startDate,
    startDateLocal: strava_activity.startDateLocal,
    createdAt: strava_activity.createdAt,
    updatedAt: strava_activity.updatedAt,
    gear: strava_gear?.id
      ? {
          ...strava_gear,
          distance: +strava_gear.distance
        }
      : null,
    personalBests: personalBests?.map(personalBest => ({
      ...personalBest,
      distance: +personalBest.distance,
      distanceInKilometers: +personalBest.distanceInKilometers
    }))
  };
};

const create = async (id: string, stravaApiActivity: StravaApiActivity): Promise<void> => {
  const activity = await db
    .select()
    .from(stravaActivity)
    .where(eq(stravaActivity.stravaId, id))
    .get();

  // update if activity exists
  if (activity) {
    await db
      .update(stravaActivity)
      .set({
        name: stravaApiActivity.name,
        type: stravaApiActivity.type,
        distance: stravaApiActivity.distance,
        movingTime: stravaApiActivity.movingTime,
        hasHeartRate: stravaApiActivity.hasHeartRate,
        averageHeartRate: stravaApiActivity.averageHeartRate,
        averageSpeed: stravaApiActivity.averageSpeed,
        maxSpeed: stravaApiActivity.maxSpeed,
        sufferScore: stravaApiActivity.sufferScore,
        distanceInKilometers: stravaApiActivity.distanceInKilometers,
        formattedMovingTime: stravaApiActivity.formattedMovingTime,
        kilometersPerHour: stravaApiActivity.kilometersPerSecond,
        minutesPerKilometer: stravaApiActivity.minutesPerKilometer ?? 0,
        calories: stravaApiActivity.calories,
        kudosCount: stravaApiActivity.kudosCount,
        locationCountry: stravaApiActivity.locationCountry,
        maxHeartRate: stravaApiActivity.maxHeartRate,
        totalElevationGain: stravaApiActivity.totalElevationGain,
        startDate: stravaApiActivity.startDate,
        startDateLocal: stravaApiActivity.startDateLocal,
        stravaId: stravaApiActivity.id.toString(),
        updatedAt: new Date().toISOString()
      })
      .where(eq(stravaActivity.stravaId, activity.stravaId));

    if (stravaApiActivity.gear?.id) {
      await db
        .update(stravaGear)
        .set({
          stravaGearId: stravaApiActivity.gear.id,
          primary: stravaApiActivity.gear.primary,
          distance: stravaApiActivity.gear.distance,
          retired: stravaApiActivity.gear.retired,
          resourceState: stravaApiActivity.gear.resource_state.toString(),
          name: stravaApiActivity.gear.name
        })
        .where(eq(stravaGear.id, activity.stravaGearId));
    }

    for (const personalBest of stravaApiActivity.personalBests) {
      await db
        .update(stravaPersonalBest)
        .set({
          name: personalBest.name,
          distance: personalBest.distance,
          distanceInKilometers: personalBest.distanceInKilometers,
          movingTime: personalBest.movingTime,
          formattedMovingTime: personalBest.formattedMovingTime,
          stravaActivityId: stravaApiActivity.id
        } satisfies InsertStravaPersonalBest)
        .where(
          and(
            eq(stravaPersonalBest.name, personalBest.name),
            eq(stravaPersonalBest.stravaActivityId, activity.id)
          )
        );
    }

    return;
  }

  let existingGear: SelectStravaGear = null;

  if (stravaApiActivity.gear?.id) {
    existingGear = await db
      .select()
      .from(stravaGear)
      .where(eq(stravaGear.stravaGearId, stravaApiActivity.gear.id))
      .get();
  }

  // create if activity does not exist
  if (stravaApiActivity.gear?.id && !existingGear) {
    const insertedStravaGear = await db
      .insert(stravaGear)
      .values({
        stravaGearId: stravaApiActivity.gear.id,
        primary: stravaApiActivity.gear.primary,
        distance: stravaApiActivity.gear.distance,
        retired: stravaApiActivity.gear.retired,
        resourceState: stravaApiActivity.gear.resource_state.toString(),
        name: stravaApiActivity.gear.name
      } satisfies InsertStravaGear)
      .returning()
      .get();
    existingGear = insertedStravaGear;
  }

  await db.insert(stravaActivity).values({
    name: stravaApiActivity.name,
    type: stravaApiActivity.type,
    distance: stravaApiActivity.distance,
    movingTime: stravaApiActivity.movingTime,
    hasHeartRate: stravaApiActivity.hasHeartRate,
    averageHeartRate: stravaApiActivity.averageHeartRate,
    averageSpeed: stravaApiActivity.averageSpeed,
    maxSpeed: stravaApiActivity.maxSpeed,
    sufferScore: stravaApiActivity.sufferScore ?? 0,
    distanceInKilometers: stravaApiActivity.distanceInKilometers,
    formattedMovingTime: stravaApiActivity.formattedMovingTime,
    kilometersPerHour: stravaApiActivity.kilometersPerSecond,
    minutesPerKilometer: stravaApiActivity.minutesPerKilometer ?? 0,
    calories: stravaApiActivity.calories,
    kudosCount: stravaApiActivity.kudosCount,
    locationCountry: stravaApiActivity.locationCountry,
    maxHeartRate: stravaApiActivity.maxHeartRate,
    totalElevationGain: stravaApiActivity.totalElevationGain,
    startDate: stravaApiActivity.startDate,
    startDateLocal: stravaApiActivity.startDateLocal,
    stravaId: stravaApiActivity.id.toString(),
    stravaGearId: existingGear?.id
  } satisfies InsertStravaActivity);

  for (const personalBest of stravaApiActivity.personalBests) {
    await db.insert(stravaPersonalBest).values({
      name: personalBest.name,
      distance: personalBest.distance,
      distanceInKilometers: personalBest.distanceInKilometers,
      movingTime: personalBest.movingTime,
      formattedMovingTime: personalBest.formattedMovingTime,
      stravaActivityId: stravaApiActivity.id
    } satisfies InsertStravaPersonalBest);
  }
};

const getAll = async (): Promise<StravaActivityWithGearAndPersonalBests[]> => {
  const result = (
    await db
      .select()
      .from(stravaActivity)
      .leftJoin(stravaGear, eq(stravaActivity.stravaGearId, stravaGear.id))
      .leftJoin(stravaPersonalBest, eq(stravaActivity.id, stravaPersonalBest.stravaActivityId))
  ).reduce<Record<number, StravaActivityWithGearAndPersonalBests>>((acc, row) => {
    const activity = row.strava_activity;
    const gear = row.strava_gear;
    const personalBest = row.strava_personal_best;
    if (!acc[activity.id]) {
      acc[activity.id] = { ...activity, gear, personalBests: [] };
    }
    if (personalBest) {
      acc[activity.id].personalBests.push(personalBest);
    }
    return acc;
  }, {});

  return Object.values(result).sort(
    (a, b) => new Date(b.startDateLocal).getTime() - new Date(a.startDateLocal).getTime()
  );
};

const getActivityFromStravaApi = async (id: string) => {
  return createActivity(
    await (
      await client()
    ).activities.get({
      id: id
    })
  );
};

const update = async (
  id: string,
  entity: StravaApiActivity | Partial<StravaApiActivity>
): Promise<void> => {
  await db
    .update(stravaActivity)
    .set({
      name: entity.name
    })
    .where(eq(stravaActivity.stravaId, id));
};

const getAndCreate = async (id: string): Promise<void> => {
  const activity = await getActivityFromStravaApi(id);

  await create(id, {
    ...activity,
    name: "Evening Activity"
  });
};

const get = async () => await getAll();

const getStats = async (): Promise<StravaStats> => {
  return createStats(await getAll());
};

const removeById = async (id: number): Promise<void> => {
  await db.delete(stravaActivity).where(eq(stravaActivity.id, id));
};

const removeByStravaId = async (id: string): Promise<void> => {
  await db.delete(stravaActivity).where(eq(stravaActivity.stravaId, id));
};

const removeAll = async (): Promise<void> => {
  await db.run(sql.raw("DELETE FROM strava_activity;"));

  await db.run(sql.raw("DELETE FROM SQLITE_SEQUENCE WHERE name='strava_activity';"));
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

  let detailedActivities: StravaApiActivity[] = [];

  const importedActivities = await getAll();

  for (const activity of activities.filter(
    activity => !importedActivities.some(importedActivity => importedActivity.id === activity.id)
  )) {
    const detailedActivity = createActivity(
      await stravaClient.activities.get({
        id: activity.id
      })
    );

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

    console.info(`Import activity with ID ${id}`);

    await create(detailedActivity.id.toString(), {
      id,
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
  removeByStravaId,
  removeById,
  removeAll,
  importActivities
};

export default strava;
