import { MongoClient } from "mongodb";
import stravaFactory from "../../factories/stravaFactory";

const client = new MongoClient(process.env.TLB_MONGODB_STRAVA_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export async function getClient() {
  if (!client.isConnected()) {
    await client.connect();
  }

  return client;
}

export async function getTommylMongoDB() {
  return (await getClient()).db("tommylb");
}

export async function getAllStravaActivities() {
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
    activities.push(stravaFactory.createActivity(activity));
  }

  return activities;
}
