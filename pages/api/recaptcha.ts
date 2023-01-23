import { NextApiRequest, NextApiResponse } from "next";

export default async function googleReCaptchaVerify(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.send("Method not allowed.");
  }

  const apiKey = process.env.NEXT_PUBLIC_TOMMYLB_GOOGLE_RECAPTCHA_V3_SECRET_KEY;
  if (!apiKey) {
    return res.status(500).end();
  }

  try {
    if (!req.body || req.body === "" || !req.body.token) {
      return res.status(400).end();
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `secret=${process.env.NEXT_PUBLIC_TOMMYLB_GOOGLE_RECAPTCHA_V3_SECRET_KEY}&response=${req.body.token}`
    });

    return res.status(200).json(await response.json());
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
