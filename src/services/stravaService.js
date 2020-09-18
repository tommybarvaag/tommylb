import stravaFactory from "../factories/stravaFactory";
import stravaRepository from "../lib/mongodb/stravaRepository";

const getAllStravaActivities = async () => {
  const activities = await stravaRepository.get();

  return stravaFactory.createActivities(activities);
};

const getAllStravaStats = async () => {
  const activities = await stravaRepository.get();

  return stravaFactory.createStats(activities);
};

export default {
  getAllStravaActivities,
  getAllStravaStats
};
