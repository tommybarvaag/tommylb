import { db } from "@/db/db";
import { notificationLogs } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export interface GetAvailableTimeWeekResponse {
  AvailableTimeList: AvailableTimeList[];
  ErrorList: any;
  ResponseCode: number;
  ResponseMessage: string;
}

export interface AvailableTimeList {
  AvailableTimeString: string;
  Date: string;
  EmployeeId: string;
  LongestAvailableTimeSlot: number;
}

const NOTIFICATION_TYPE = "barber";

function getPayload(date: string) {
  return {
    siteId: 2688,
    date, // "2024.05.13"
    treatmentIds: ["C771zkS@Wf[R2B5F"],
    employeeIds: ["C771BkS@B^]PkiUw"],
    istpn: false,
    tpnChainId: 0,
    tpnSiteId: 2688
  };
}

async function getAvailableTimeWeek(date: string) {
  const response = await fetch("https://fixit.no/api/ajax/AvailableTimeApi/GetAvailableTimeWeek", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(getPayload(date))
  });

  const responseJson = await response.json();

  return responseJson as Promise<GetAvailableTimeWeekResponse>;
}

async function getAvailableTimeSlots() {
  const datesToFetchFor = ["2024.05.6", "2024.05.13"];

  const availableTimeSlots = await Promise.all(
    datesToFetchFor.map(async date => getAvailableTimeWeek(date))
  );

  const slots = availableTimeSlots.flatMap(
    availableTimeSlot => availableTimeSlot.AvailableTimeList
  );

  console.log(slots);

  return slots
    .filter(
      slot =>
        slot.AvailableTimeString !==
        "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    )
    .map(slot => slot.Date);
}

export async function GET(request: Request) {
  const allNotifications = await db
    .select()
    .from(notificationLogs)
    .orderBy(desc(notificationLogs.id));

  return Response.json(allNotifications ?? []);
}

export async function POST() {
  const availableTimeSlots = await getAvailableTimeSlots();

  const alreadySentNotification = await db
    .select()
    .from(notificationLogs)
    .where(and(eq(notificationLogs.type, NOTIFICATION_TYPE)));

  const availableTimeSlotsToNotify = availableTimeSlots.filter(
    slot => !alreadySentNotification.some(sentSlot => sentSlot.value === slot)
  );

  if (availableTimeSlotsToNotify.length === 0) {
    console.info("No new available time slots to notify.");

    return Response.json({
      type: NOTIFICATION_TYPE,
      value: availableTimeSlotsToNotify
    });
  }

  // semi-colon separated env variable
  const recipients = process.env.NOTIFICATIONS_NEXT_JS_RELEASE_RECIPIENTS?.split(";");

  // If no recipients are set, skip further action and return latest release
  if (!recipients) {
    console.info("No recipients are set.");
    return Response.json({
      type: NOTIFICATION_TYPE,
      value: availableTimeSlotsToNotify
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
      subject: `New time ${availableTimeSlotsToNotify.length > 1 ? "slots" : "slot"} for barber`,
      html: `<div>
            <h3>New time ${availableTimeSlotsToNotify.length > 1 ? "slots" : "slot"} for barber</h3>
            <div>
              <ul>
                ${availableTimeSlotsToNotify
                  .map(
                    slot => `<li>
                    <a href="https://fixit.no/frisor/morland-barbers/2688">${slot}</a>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>`
    })
  });

  // Log notification sent
  if (response.ok) {
    console.info("Notification sent");

    await db.insert(notificationLogs).values(
      availableTimeSlotsToNotify.map(slot => ({
        type: NOTIFICATION_TYPE,
        value: slot
      }))
    );
  }

  return Response.json({
    type: NOTIFICATION_TYPE,
    value: availableTimeSlotsToNotify
  });
}
