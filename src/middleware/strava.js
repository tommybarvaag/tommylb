import nextConnect from "next-connect";
import stravaApi from "strava-v3";

async function strava(req, res, next) {
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

  req.stravaAccessToken = refreshTokenResponse.access_token;
  req.stravaClient = new stravaApi.client(refreshTokenResponse.access_token);

  return next();
}

const middleware = nextConnect();

middleware.use(strava);

export default middleware;
