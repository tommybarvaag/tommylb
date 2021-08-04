import planetscaleTableNotifications from "@/lib/planetscale/repositories/notifications";
import sendgridMail from "@/lib/sendgridMail";

const NOTIFICATION_TYPE = "next-js-release";

// https://docs.github.com/en/rest/reference/repos#releases
const fetchLatestNonPrereleaseNextJsRelease = async () => {
  let page = 1;
  // Max per page is 100
  const perPage = 100;
  let releasesToRetrieve = true;
  let release = null;

  while (releasesToRetrieve) {
    const releaseResponse =
      (await fetch(
        `https://api.github.com/repos/vercel/next.js/releases?per_page=${perPage}&page=${page}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.GITHUB_API_USERNAME + ":" + process.env.GITHUB_API_RELEASE_PAT
            ).toString("base64")}`,
            Accept: "application/vnd.github.v3+json"
          }
        }
      ).then(response => response.json())) ?? [];

    releasesToRetrieve =
      releaseResponse.length > 0 && releaseResponse.every(release => release.prerelease);
    page++;

    if (!releasesToRetrieve) {
      release = releaseResponse
        .filter(release => !release.prerelease)
        .reduce((a, b) => (a.published_at > b.published_at ? a : b), {});
    }
  }

  return release;
};

export default async function nextJsRelease(req, res) {
  if (req.method === "GET") {
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
