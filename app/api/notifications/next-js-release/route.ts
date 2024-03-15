import { db } from "@/db/db";
import { notificationLogs } from "@/db/schema";
import { fetchLatestNonPrereleaseNextJsRelease } from "@/lib/github";
import { and, desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const NOTIFICATION_TYPE = "next-js-release";

export async function GET(request: Request) {
  const allNotifications = await db
    .select()
    .from(notificationLogs)
    .orderBy(desc(notificationLogs.id));

  return Response.json(allNotifications ?? []);
}

export async function POST() {
  const latestNonPrerelease = await fetchLatestNonPrereleaseNextJsRelease();
  const latestNonPrereleaseVersion = latestNonPrerelease?.tag_name ?? latestNonPrerelease?.name;

  const sentNotification = await db
    .select()
    .from(notificationLogs)
    .where(
      and(
        eq(notificationLogs.type, NOTIFICATION_TYPE),
        eq(notificationLogs.value, latestNonPrereleaseVersion)
      )
    )
    .get();

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

  // semi-colon separated env variable
  const recipients = process.env.NOTIFICATIONS_NEXT_JS_RELEASE_RECIPIENTS?.split(";");

  // If no recipients are set, skip further action and return latest release
  if (!recipients) {
    console.info("No recipients are set.");
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
      to: recipients,
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

    await db.insert(notificationLogs).values({
      type: NOTIFICATION_TYPE,
      value: latestNonPrereleaseVersion
    });
  }

  return Response.json({
    type: NOTIFICATION_TYPE,
    value: latestNonPrereleaseVersion
  });
}
