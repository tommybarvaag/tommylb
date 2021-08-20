import { fetchLatestNonPrereleaseNextJsRelease } from "@/lib/github";
import planetscaleTableNotifications from "@/lib/planetscale/repositories/notifications";
import sendgridMail from "@/lib/sendgridMail";

const NOTIFICATION_TYPE = "next-js-release";

export default async function nextJsRelease(req, res) {
  if (req.method === "GET") {
    const allNotifications = await planetscaleTableNotifications.get();

    return res.status(200).json(allNotifications ?? []);
  }

  if (req.method === "POST") {
    const latestNonPrerelease = await fetchLatestNonPrereleaseNextJsRelease();

    const sentNotification = await planetscaleTableNotifications.getByTypeAndValue(
      NOTIFICATION_TYPE,
      latestNonPrerelease.name
    );

    // If notification for type and value is already sent
    // skip further action and return latest release
    if (
      sentNotification?.type === NOTIFICATION_TYPE &&
      sentNotification?.value === latestNonPrerelease.name
    ) {
      console.info("Notification is already sent.");

      return res.status(200).json({
        type: NOTIFICATION_TYPE,
        value: latestNonPrerelease.name
      });
    }

    // Send notification
    const sendMailResponse = await sendgridMail.send({
      to: "tommy@barvaag.com",
      from: "post@tommylb.com",
      subject: `New Next.js release ${latestNonPrerelease.name}`,
      html: `<div>
            <h3>New Next.js release ${latestNonPrerelease.name}</h3>
            <div><a href="${latestNonPrerelease.html_url}">Click</a> to view release.</div>
          </div>`
    });

    // Log notification sent
    if (sendMailResponse?.[0].statusCode === 202) {
      console.info("Notification sent");
      await planetscaleTableNotifications.insert(NOTIFICATION_TYPE, latestNonPrerelease.name);
    }

    return res.status(200).json({
      type: NOTIFICATION_TYPE,
      value: latestNonPrerelease.name
    });
  }

  return res.send("Method not allowed.");
}
