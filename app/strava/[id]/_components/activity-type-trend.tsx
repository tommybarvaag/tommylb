import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import { planetScale } from "@/lib/planetscale";
import { cn } from "@/lib/utils";
import { StravaActivity } from "@prisma/client";

type StravaActivityAverages = {
  averageMovingTime: number;
  averageHeartRate: number;
  averageMaxHeartRate: number;
  averageSufferScore: number;
  averageCalories: number;
};

type Stats = {
  name: string;
  stat: number;
  previousStat: number;
  changeType: "increase" | "decrease";
  change: string;
};

function roundToNearestTwoDecimalPlaces(value: number) {
  return Math.round(value * 100) / 100;
}

async function getStravaActivity(id: number) {
  const { rows } = await planetScale.execute("SELECT * FROM StravaActivity WHERE ID = ?", [id]);

  if (!rows?.length) {
    return null;
  }

  const [stravaActivity] = rows;

  return stravaActivity as StravaActivity;
}

async function getStravaActivityAveragesByType(id: number) {
  const activity = await getStravaActivity(id);

  if (!activity) {
    return null;
  }

  const { rows } = await planetScale.execute(
    "SELECT avg(movingTime) as averageMovingTime, avg(averageHeartRate) as averageHeartRate, avg(maxHeartRate) as averageMaxHeartRate, avg(sufferScore) as averageSufferScore, avg(calories) as averageCalories FROM StravaActivity WHERE type = ?",
    [activity.type]
  );

  if (!rows?.length) {
    return null;
  }

  const [row] = rows;

  const stravaActivityAveragesRow = row as StravaActivityAverages;

  // map the row to the correct type
  // and round the averages to 2 decimal places
  const stravaActivityAverages = {
    averageMovingTime: roundToNearestTwoDecimalPlaces(stravaActivityAveragesRow.averageMovingTime),
    averageHeartRate: roundToNearestTwoDecimalPlaces(stravaActivityAveragesRow.averageHeartRate),
    averageMaxHeartRate: roundToNearestTwoDecimalPlaces(
      stravaActivityAveragesRow.averageMaxHeartRate
    ),
    averageSufferScore: roundToNearestTwoDecimalPlaces(
      stravaActivityAveragesRow.averageSufferScore
    ),
    averageCalories: roundToNearestTwoDecimalPlaces(stravaActivityAveragesRow.averageCalories)
  };

  // Calculate the change in stats
  const stats: Stats[] = [
    {
      name: "Moving Time (s)",
      stat: activity.movingTime,
      previousStat: stravaActivityAverages.averageMovingTime,
      changeType:
        activity.movingTime > stravaActivityAverages.averageMovingTime ? "increase" : "decrease",
      change: `${roundToNearestTwoDecimalPlaces(
        Math.abs(activity.movingTime - stravaActivityAverages.averageMovingTime)
      )}`
    },
    {
      name: "Heart Rate (bpm)",
      stat: Number(activity.averageHeartRate),
      previousStat: stravaActivityAverages.averageHeartRate,
      changeType:
        Number(activity.averageHeartRate) > stravaActivityAverages.averageHeartRate
          ? "increase"
          : "decrease",
      change: `${roundToNearestTwoDecimalPlaces(
        Math.abs(Number(activity.averageHeartRate) - stravaActivityAverages.averageHeartRate)
      )}`
    },
    {
      name: "Max Heart Rate (bpm)",
      stat: Number(activity.maxHeartRate),
      previousStat: stravaActivityAverages.averageMaxHeartRate,
      changeType:
        Number(activity.maxHeartRate) > stravaActivityAverages.averageMaxHeartRate
          ? "increase"
          : "decrease",
      change: `${roundToNearestTwoDecimalPlaces(
        Math.abs(Number(activity.maxHeartRate) - stravaActivityAverages.averageMaxHeartRate)
      )}`
    },
    {
      name: "Suffer Score",
      stat: Number(activity.sufferScore),
      previousStat: stravaActivityAverages.averageSufferScore,
      changeType:
        Number(activity.sufferScore) > stravaActivityAverages.averageSufferScore
          ? "increase"
          : "decrease",
      change: `${roundToNearestTwoDecimalPlaces(
        Math.abs(Number(activity.sufferScore) - stravaActivityAverages.averageSufferScore)
      )}`
    },
    {
      name: "Calories",
      stat: Number(activity.calories),
      previousStat: stravaActivityAverages.averageCalories,
      changeType:
        Number(activity.calories) > stravaActivityAverages.averageCalories
          ? "increase"
          : "decrease",
      change: `${roundToNearestTwoDecimalPlaces(
        Math.abs(Number(activity.calories) - stravaActivityAverages.averageCalories)
      )}`
    }
  ];

  return stats;
}

export async function ActivityTypeTrend({
  id,
  stagger = "1"
}: {
  id: StravaActivity["id"];
  stagger?: string;
}) {
  const stats = await getStravaActivityAveragesByType(id);

  return (
    <div
      className="my-8"
      data-animate
      style={{
        "--stagger": stagger
      }}
    >
      <Heading as="h3">Stats</Heading>
      <dl className="grid grid-cols-1 gap-x-8 overflow-hidden rounded-lg shadow md:grid-cols-2">
        {stats.map(item => (
          <div key={item.name} className="py-5">
            <dt className="text-base font-normal">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-base font-semibold">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-zinc-400">
                  average {item.previousStat}
                </span>
              </div>

              <div
                className={cn(
                  item.changeType === "increase" ? "text-emerald-500" : "text-rose-500",
                  "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <Icons.ArrowUp
                    className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <Icons.ArrowDown
                    className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-rose-500"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase" ? "Increased" : "Decreased"} by{" "}
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
