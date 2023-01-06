import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import prisma from "@/lib/prisma";
import "@/styles/mdx.css";
import { getFormattedLongDate } from "@/utils/dateUtils";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

interface StravaActivityPageProps {
  params: {
    id: string;
  };
}

async function getStravaActivities() {
  console.time("getStravaActivities");
  const activity = await prisma.stravaActivity.findMany({
    orderBy: {
      id: "desc"
    },
    select: {
      id: true
    }
  });
  console.timeEnd("getStravaActivities");

  return activity;
}

async function getStravaActivity(id: string) {
  const activity = await prisma.stravaActivity.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      gear: true,
      personalBests: true
    }
  });

  return activity;
}

const ActivityDescription = ({
  activity,
  ...other
}: React.ComponentPropsWithoutRef<typeof Text> & {
  activity: Prisma.PromiseReturnType<typeof getStravaActivity>;
}) => {
  return (
    <Text {...other}>
      {`On ${getFormattedLongDate(activity.startDateLocal)}, I participated in an ${
        activity.name
      }. The activity was located in ${activity.locationCountry} and lasted for a moving time of ${
        activity.formattedMovingTime
      }. During this time, I had an average heart rate of ${
        activity.averageHeartRate
      } beats per minute and a maximum heart rate of ${
        activity.maxHeartRate
      } beats per minute. My suffer score for this activity was ${
        activity.sufferScore
      } and I burned a total of ${
        activity.calories
      } calories. No personal records were set during this workout.`}
    </Text>
  );
};

export async function generateStaticParams(): Promise<StravaActivityPageProps["params"][]> {
  const allActivities = await getStravaActivities();

  return allActivities.map(activity => ({
    id: activity.id.toString()
  }));
}

export default async function StravaActivityPage({ params }: StravaActivityPageProps) {
  const activity = await getStravaActivity(params.id);

  if (!activity) {
    return notFound();
  }

  return (
    <article className="container relative max-w-3xl">
      <Link
        href="/strava"
        className="absolute -left-[200px] hidden items-center justify-center xl:inline-flex"
        underline={false}
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
        Strava activities
      </Link>
      <div>
        <Heading
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          {activity.name}
        </Heading>
        <ActivityDescription
          activity={activity}
          data-animate
          style={{
            "--stagger": "2"
          }}
        />
      </div>
    </article>
  );
}
