import { MongoClient } from "mongodb";

export const getClient = async () =>
  await MongoClient.connect(process.env.TLB_MONGODB_STRAVA_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
