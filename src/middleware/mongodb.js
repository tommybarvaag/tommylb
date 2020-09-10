import nextConnect from "next-connect";
import { getClient, getTommylMongoDB } from "../lib/mongodb/dbConnection";

const middleware = nextConnect();

export async function database(req, res, next) {
  const client = await getClient();
  const tommylbMongoDB = await getTommylMongoDB();
  req.mongodbClient = client;
  req.mongodb = tommylbMongoDB;
  return next();
}

middleware.use(database);

export default middleware;
