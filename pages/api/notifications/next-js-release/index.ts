import { fetchLatestNonPrereleaseNextJsRelease } from "@/lib/github";
import prisma from "@/lib/prisma";
import sendgridMail from "@/lib/sendgridMail";
import { NextApiRequest, NextApiResponse } from "next";

const NOTIFICATION_TYPE = "next-js-release";

export default async function nextJsRelease(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const allNotifications = await prisma.notification_log.findMany({});
    return res.status(200).json(allNotifications ?? []);
  }

  if (req.method === "POST") {
    const latestNonPrerelease = await fetchLatestNonPrereleaseNextJsRelease();
    const latestNonPrereleaseVersion = latestNonPrerelease?.tag_name ?? latestNonPrerelease?.name;

    const sentNotification = await prisma.notification_log.findFirst({
      where: {
        type: NOTIFICATION_TYPE,
        value: latestNonPrereleaseVersion
      }
    });

    // If notification for type and value is already sent
    // skip further action and return latest release
    if (
      sentNotification?.type === NOTIFICATION_TYPE &&
      sentNotification?.value === latestNonPrereleaseVersion
    ) {
      console.info("Notification is already sent.");

      return res.status(200).json({
        type: NOTIFICATION_TYPE,
        value: latestNonPrereleaseVersion
      });
    }

    // Send notification
    const sendMailResponse = await sendgridMail.send({
      to: ["tommy@barvaag.com", "erlend.rommetveit@gmail.com"],
      from: "post@tommylb.com",
      subject: `New Next.js release ${latestNonPrereleaseVersion}`,
      html: `<div>
            <h3>New Next.js release ${latestNonPrereleaseVersion}</h3>
            <div><a href="${latestNonPrerelease.html_url}">Click</a> to view release.</div>
          </div>`
    });

    // Log notification sent
    if (sendMailResponse?.[0].statusCode === 202) {
      console.info("Notification sent");
      await prisma.notification_log.create({
        data: {
          type: NOTIFICATION_TYPE,
          value: latestNonPrereleaseVersion
        }
      });
    }

    return res.status(200).json({
      type: NOTIFICATION_TYPE,
      value: latestNonPrereleaseVersion
    });
  }

  return res.send("Method not allowed.");
}
