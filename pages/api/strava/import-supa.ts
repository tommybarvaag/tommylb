import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import strava from "@/lib/strava";
import { NextApiRequest, NextApiResponse } from "next";
import { StravaApiActivity } from "types";

export default async function Import(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const activities = await strava.get();

    const redisActivities = (await redis.hvals("strava"))
      .map<StravaApiActivity>((entry: string) => {
        return JSON.parse(entry) as StravaApiActivity;
      })
      .sort((a, b) => new Date(a.startDateLocal).getTime() - new Date(b.startDateLocal).getTime());

    const collection = await prisma.$transaction(
      redisActivities.map(activity =>
        prisma.stravaActivity.create({
          data: {
            name: activity.name,
            type: activity.type,
            distance: activity.distance,
            movingTime: activity.movingTime,
            hasHeartRate: activity.hasHeartRate,
            averageHeartRate: activity.averageHeartRate,
            averageSpeed: activity.averageSpeed,
            maxSpeed: activity.maxSpeed,
            sufferScore: activity.sufferScore,
            distanceInKilometers: activity.distanceInKilometers,
            formattedMovingTime: activity.formattedMovingTime,
            kilometersPerHour: activity.kilometersPerSecond,
            minutesPerKilometer: activity.minutesPerKilometer ?? 0,
            calories: activity.calories,
            kudosCount: activity.kudosCount,
            locationCountry: activity.locationCountry,
            maxHeartRate: activity.maxHeartRate,
            totalElevationGain: activity.totalElevationGain,
            startDate: activity.startDate,
            startDateLocal: activity.startDateLocal,
            updatedAt: new Date(),
            createdAt: new Date(),
            stravaId: activity.id.toString(),
            gear: activity?.gear?.id
              ? {
                  connectOrCreate: {
                    where: {
                      stravaGearId: activity.gear.id
                    },
                    create: {
                      name: activity.gear.name,
                      stravaGearId: activity.gear.id,
                      resourceState: activity.gear.resource_state,
                      distance: activity.gear.distance,
                      primary: activity.gear.primary ?? false,
                      retired: activity.gear.retired ?? false
                    }
                  }
                }
              : undefined,
            personalBests: {
              createMany: {
                data:
                  activity.personalBests.map(personalBest => ({
                    name: personalBest.name,
                    distance: personalBest.distance,
                    distanceInKilometers: personalBest.distanceInKilometers,
                    movingTime: personalBest.movingTime,
                    formattedMovingTime: personalBest.formattedMovingTime
                  })) ?? []
              }
            }
          }
        })
      )
    );

    return res.status(200).json(collection);
  }

  return res.send("Method not allowed.");
}
