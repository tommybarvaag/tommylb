import { getClient } from "./dbConnection";

const get = async (query = {}, sort = { start_date_local: -1 }) => {
  const client = await getClient();

  let cursor = client.db("tommylb").collection("strava").find(query).sort(sort).project({
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
    best_efforts: true,
    gear: true
  });

  let activities = [];

  while (await cursor.hasNext()) {
    const activity = await cursor.next();

    const { _id, ...activityToPush } = activity;

    activities.push({ ...activityToPush, mongoId: _id });
  }

  await client.close();

  return activities;
};

const deleteOne = async query => {
  if (!query) {
    return;
  }

  const client = await getClient();

  await client.db("tommylb").collection("strava").deleteOne(query);

  await client.close();
};

const deleteMany = async (query = {}) => {
  const client = await getClient();

  await client.db("tommylb").collection("strava").deleteMany(query);

  await client.close();
};

const insertOne = async document => {
  if (!document) {
    return;
  }

  const client = await getClient();

  await client.db("tommylb").collection("strava").insertOne(document);

  await client.close();
};

const insertMany = async documents => {
  if (!documents) {
    return;
  }

  const client = await getClient();

  await client.db("tommylb").collection("strava").insertMany(documents);

  await client.close();
};

const findOneAndUpdate = async (query, update) => {
  if (!query || !update) {
    return;
  }

  const client = await getClient();

  await client.db("tommylb").collection("strava").findOneAndUpdate(query, update);

  await client.close();
};

export default {
  get,
  deleteOne,
  deleteMany,
  insertOne,
  insertMany,
  findOneAndUpdate
};
