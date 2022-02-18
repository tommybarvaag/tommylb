import { Prisma } from "@prisma/client";
import stravaApi from "strava-v3";
import {
  StravaApiActivity,
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
import prisma from "./prisma";

export type StravaActivityWithGearAndPersonalBests = Prisma.PromiseReturnType<typeof getById>;
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
    gear: activity.gear.id
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
      const startDate = parseDateISO(activity.startDate);
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
  const activity = await prisma.stravaActivity.findUnique({
    where: { id },
    include: {
      personalBests: true,
      gear: true
    }
  });

  return {
    ...activity,
    distance: +activity.distance,
    distanceInKilometers: +activity.distanceInKilometers,
    kilometersPerHour: +activity.kilometersPerHour,
    minutesPerKilometer: +activity.minutesPerKilometer,
    totalElevationGain: +activity.totalElevationGain,
    averageSpeed: +activity.averageSpeed,
    maxSpeed: +activity.maxSpeed,
    averageHeartRate: activity.averageHeartRate ? +activity.averageHeartRate : null,
    maxHeartRate: activity.maxHeartRate ? +activity.maxHeartRate : null,
    sufferScore: activity.sufferScore ? +activity.sufferScore : null,
    calories: +activity.calories,
    startDate: activity.startDate.toISOString(),
    startDateLocal: activity.startDateLocal.toISOString(),
    createdAt: activity.createdAt.toISOString(),
    updatedAt: activity.updatedAt.toISOString(),
    gear: activity?.gear?.id
      ? {
          ...activity.gear,
          distance: +activity.gear.distance
        }
      : null,
    personalBests: activity.personalBests?.map(personalBest => ({
      ...personalBest,
      distance: +personalBest.distance,
      distanceInKilometers: +personalBest.distanceInKilometers
    }))
  };
};

const getByStravaId = async (stravaId: string) => {
  return await prisma.stravaActivity.findUnique({
    where: { stravaId: stravaId.toString() },
    include: {
      personalBests: true,
      gear: true
    }
  });
};

const create = async (id: string, stravaApiActivity: StravaApiActivity): Promise<void> => {
  await prisma.stravaActivity.upsert({
    where: { stravaId: id },
    create: {
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
      updatedAt: new Date(),
      createdAt: new Date(),
      stravaId: stravaApiActivity.id.toString(),
      gear: stravaApiActivity?.gear?.id
        ? {
            connectOrCreate: {
              where: {
                stravaGearId: stravaApiActivity.gear.id
              },
              create: {
                name: stravaApiActivity.gear.name,
                stravaGearId: stravaApiActivity.gear.id,
                resourceState: stravaApiActivity.gear.resource_state,
                distance: stravaApiActivity.gear.distance,
                primary: stravaApiActivity.gear.primary ?? false,
                retired: stravaApiActivity.gear.retired ?? false
              }
            }
          }
        : undefined,
      personalBests: {
        createMany: {
          data:
            stravaApiActivity.personalBests.map(personalBest => ({
              name: personalBest.name,
              distance: personalBest.distance,
              distanceInKilometers: personalBest.distanceInKilometers,
              movingTime: personalBest.movingTime,
              formattedMovingTime: personalBest.formattedMovingTime
            })) ?? []
        }
      }
    },
    update: {
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
      updatedAt: new Date(),
      stravaId: stravaApiActivity.id.toString(),
      gear: stravaApiActivity?.gear?.id
        ? {
            connectOrCreate: {
              where: {
                stravaGearId: stravaApiActivity.gear.id
              },
              create: {
                name: stravaApiActivity.gear.name,
                stravaGearId: stravaApiActivity.gear.id,
                resourceState: stravaApiActivity.gear.resource_state,
                distance: stravaApiActivity.gear.distance,
                primary: stravaApiActivity.gear.primary ?? false,
                retired: stravaApiActivity.gear.retired ?? false
              }
            }
          }
        : undefined,
      personalBests: {
        createMany: {
          data:
            stravaApiActivity.personalBests.map(personalBest => ({
              name: personalBest.name,
              distance: personalBest.distance,
              distanceInKilometers: personalBest.distanceInKilometers,
              movingTime: personalBest.movingTime,
              formattedMovingTime: personalBest.formattedMovingTime
            })) ?? []
        }
      }
    }
  });
};

const getAll = async (): Promise<StravaActivityWithGearAndPersonalBests[]> => {
  return (
    await prisma.stravaActivity.findMany({
      include: {
        personalBests: true,
        gear: true
      }
    })
  )
    .sort((a, b) => new Date(b.startDateLocal).getTime() - new Date(a.startDateLocal).getTime())
    .map(activity => ({
      ...activity,
      distance: +activity.distance,
      distanceInKilometers: +activity.distanceInKilometers,
      kilometersPerHour: +activity.kilometersPerHour,
      minutesPerKilometer: +activity.minutesPerKilometer,
      totalElevationGain: +activity.totalElevationGain,
      averageSpeed: +activity.averageSpeed,
      maxSpeed: +activity.maxSpeed,
      averageHeartRate: activity.averageHeartRate ? +activity.averageHeartRate : null,
      maxHeartRate: activity.maxHeartRate ? +activity.maxHeartRate : null,
      sufferScore: activity.sufferScore ? +activity.sufferScore : null,
      calories: +activity.calories,
      startDate: activity.startDate.toISOString(),
      startDateLocal: activity.startDateLocal.toISOString(),
      createdAt: activity.createdAt.toISOString(),
      updatedAt: activity.updatedAt.toISOString(),
      gear: activity?.gear?.id
        ? {
            ...activity.gear,
            distance: +activity.gear.distance
          }
        : null,
      personalBests: activity.personalBests?.map(personalBest => ({
        ...personalBest,
        distance: +personalBest.distance,
        distanceInKilometers: +personalBest.distanceInKilometers
      }))
    }));
};

const getActivityFromStravaApi = async (id: string) => {
  return createActivity(
    (await client()).activities.get({
      id: id
    })
  );
};

const update = async (
  id: string,
  entity: StravaApiActivity | Partial<StravaApiActivity>
): Promise<void> => {
  await prisma.stravaActivity.update({
    where: { stravaId: id },
    data: {
      name: entity.name
    }
  });
};

const getAndCreate = async (id: string): Promise<void> => {
  const activity = await getActivityFromStravaApi(id);
  await create(id, activity);
};

const get = async () => await getAll();

const getStats = async (): Promise<StravaStats> => {
  return createStats(await getAll());
};

const remove = async (id: number): Promise<void> => {
  await prisma.stravaActivity.delete({
    where: { id: id }
  });
};

const removeAll = async (): Promise<void> => {
  await prisma.stravaActivity.deleteMany();
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
  remove,
  removeAll,
  importActivities
};

export default strava;
