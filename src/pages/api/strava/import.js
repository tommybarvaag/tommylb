import nextConnect from "next-connect";
import stravaRepository from "../../../lib/mongodb/stravaRepository";
import strava from "../../../middleware/strava";

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const handler = nextConnect();

handler.use(strava);

handler.get(async (req, res) => {
  let page = 1;
  // Max per page is 200
  const perPage = 200;
  let activitiesToRetrieve = true;
  let activities = [];

  while (activitiesToRetrieve) {
    const result = await req.stravaClient.athlete.listActivities({
      page,
      per_page: perPage
    });

    activitiesToRetrieve = result !== null && result !== undefined && result.length === perPage;
    page++;

    if (result.length > 0) {
      activities = activities.concat(result);
    }
  }

  let detailedActivities = [];

  console.log("Start fetching detailed activity info.");

  for (const activity of activities) {
    console.log(`Fetching details for ${activity.name}`);
    const detailedActivity = await req.stravaClient.activities.get({
      id: activity.id
    });

    if (req.stravaClient.rateLimiting.exceeded()) {
      const sixteenMinutesInFutureDate = new Date(new Date().getTime() + 16 * 60000);
      console.log(
        `Rate limit reached. Sleeping for 16 minutes... Should resume at ${sixteenMinutesInFutureDate.getHours()}:${sixteenMinutesInFutureDate.getMinutes()}`
      );
      await sleep(960000);
    }

    detailedActivities.push(detailedActivity);
  }

  console.log("Finished fetching detailed activity info.");

  // Deletes all entries in collection
  await stravaRepository.deleteMany();

  // Insert all activities to collection
  await stravaRepository.insertMany(detailedActivities);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(detailedActivities));
});

export default handler;
