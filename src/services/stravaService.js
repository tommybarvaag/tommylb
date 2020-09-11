import stravaFactory from "../factories/stravaFactory";
import { getTommylMongoDB } from "../lib/mongodb/dbConnection";

const get = async () => {
  let cursor = (await getTommylMongoDB())
    .collection("strava")
    .find({})
    .sort({ start_date_local: -1 })
    .project({
      name: true,
      distance: true,
      moving_time: true,
      type: true,
      id: true,
      calories: true,
      total_elevation_gain: true,
      start_date: true,
      start_date_local: true,
      location_country: true,
      kudos_count: true,
      average_speed: true,
      max_speed: true,
      has_heartrate: true,
      average_heartrate: true,
      max_heartrate: true,
      suffer_score: true,
      best_efforts: true
    });

  let activities = [];

  while (await cursor.hasNext()) {
    const activity = await cursor.next();

    const { _id, ...activityToPush } = activity;

    activities.push({ ...activityToPush, mongoId: _id });
  }

  return activities;
};

const getAllStravaActivities = async () => {
  const activities = await get();

  return stravaFactory.createActivities(activities);
};

const getAllStravaStats = async () => {
  const activities = await get();

  return stravaFactory.createStats(activities);
};

export default {
  getAllStravaActivities,
  getAllStravaStats
};
