import nextConnect from "next-connect";
import stravaService from "../../../services/stravaService";

const handler = nextConnect();

handler.get(async (req, res) => {
  const stravaStats = await stravaService.getAllStravaStats();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ...stravaStats }));
});

export default handler;
