import { fetchLatestNonPrereleaseNextJsRelease } from "@/lib/github";
import prisma from "@/lib/prisma";

const NOTIFICATION_TYPE = "next-js-release";

export async function GET(request: Request) {
  const allNotifications = await prisma.notificationLog.findMany({});
  return Response.json(allNotifications ?? []);
}

export async function POST() {
  const latestNonPrerelease = await fetchLatestNonPrereleaseNextJsRelease();
  const latestNonPrereleaseVersion = latestNonPrerelease?.tag_name ?? latestNonPrerelease?.name;

  const sentNotification = await prisma.notificationLog.findFirst({
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

    return Response.json({
      type: NOTIFICATION_TYPE,
      value: latestNonPrereleaseVersion
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_EMAIL_SENDING_API_KEY}`
    },
    body: JSON.stringify({
      // to: ["tommy@barvaag.com", "erlend.rommetveit@gmail.com"],
      to: ["tommy@barvaag.com", "tommy123@barvaag.com"],
      from: "post@barvaag.com",
      subject: `New Next.js release ${latestNonPrereleaseVersion}`,
      html: `<div>
            <h3>New Next.js release ${latestNonPrereleaseVersion}</h3>
            <div><a href="${latestNonPrerelease.html_url}">Click</a> to view release.</div>
          </div>`
    })
  });

  // Log notification sent
  if (response.ok) {
    console.info("Notification sent");
    await prisma.notificationLog.create({
      data: {
        type: NOTIFICATION_TYPE,
        value: latestNonPrereleaseVersion
      }
    });
  }

  return Response.json({
    type: NOTIFICATION_TYPE,
    value: latestNonPrereleaseVersion
  });
}
