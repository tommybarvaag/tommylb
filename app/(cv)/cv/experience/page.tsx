import { Heading } from "@/app/_components/ui/heading";
import { Text } from "@/app/_components/ui/text";
import { Time } from "@/app/_components/ui/time";
import { cn } from "@/app/_lib/utils";
import { cvEducation, cvWorkExperience } from "@/data/cv-key-points";
import { getActiveWorkYears } from "@/utils/date-utils";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";
import type { Metadata } from "next";
import { ComponentProps } from "react";

export const metadata: Metadata = metadataWithCustomOgImage(
  "Experience",
  `With over ${getActiveWorkYears()} years of experience, Tommy has developed a deep understanding of creating seamless user experiences.`,
  "Curriculum Vitae — Experience",
  "An experienced and solution-oriented senior consultant"
);

function ListItemWithTimeline({ className, children, ...props }: ComponentProps<"li">) {
  return (
    <li
      className="relative mb-10 ml-6 pl-6 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:top-8 [&:not(:last-child)]:before:left-[4px] [&:not(:last-child)]:before:h-full [&:not(:last-child)]:before:w-px [&:not(:last-child)]:before:bg-zinc-600"
      {...props}
    >
      <span className="absolute top-2 left-0 flex size-[8.75px] rounded-full bg-zinc-600" />
      {children}
    </li>
  );
}

function ListItemWithTimelineTitle({
  className,
  children,
  ...props
}: ComponentProps<typeof Heading>) {
  return (
    <Heading className={cn(className)} {...props}>
      {children}
    </Heading>
  );
}

function ListItemWithTimelineTime({ ...props }: ComponentProps<typeof Time>) {
  return <Time {...props} />;
}

function ListItemWithTimelineDescription({
  className,
  children,
  ...props
}: ComponentProps<typeof Text>) {
  return (
    <Text className={cn("", className)} {...props}>
      {children}
    </Text>
  );
}

export default async function CurriculumVitae() {
  // group work experiences with the same work place
  const workExperiencesByWorkPlace = cvWorkExperience
    .sort(
      // sort by id in descending order
      (a, b) => (a.id < b.id ? 1 : -1)
    )
    .reduce(
      (acc, workExperience) => {
        const workPlace = workExperience.workPlace;
        if (!acc[workPlace]) {
          acc[workPlace] = [];
        }
        acc[workPlace].push(workExperience);
        return acc;
      },
      {} as Record<string, typeof cvWorkExperience>
    );

  return (
    <div className="animate-in duration-500">
      <section>
        <ol className="">
          {Object.entries(workExperiencesByWorkPlace).map(([workPlace, workExperiences]) => {
            if (workExperiences.length > 1) {
              return (
                <li key={workPlace} className="mb-8">
                  <Heading>{workPlace}</Heading>
                  <ol className="relative">
                    {workExperiences.map((workExperience, index) => {
                      return (
                        <ListItemWithTimeline key={`${workExperience.id}-${index}`}>
                          <ListItemWithTimelineTitle>
                            {workExperience.workPlaceTitle}
                          </ListItemWithTimelineTitle>
                          <ListItemWithTimelineTime
                            fromDate={workExperience.fromDate}
                            toDate={workExperience.toDate}
                          />
                          <ListItemWithTimelineDescription>
                            {workExperience.summary}
                          </ListItemWithTimelineDescription>
                        </ListItemWithTimeline>
                      );
                    })}
                  </ol>
                </li>
              );
            }

            return (
              <li key={workPlace} className="mb-8">
                <Heading>{workPlace}</Heading>
                <ol className="">
                  {workExperiences.map((workExperience, index) => {
                    return (
                      <li key={`${workExperience.id}-${index}`} className="">
                        <Heading>{workExperience.workPlaceTitle}</Heading>
                        <Time fromDate={workExperience.fromDate} toDate={workExperience.toDate} />
                        <Text>{workExperience.summary}</Text>
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      </section>
      <section>
        <Heading>Education</Heading>
        <ul className="">
          {cvEducation.map((education, index) => {
            return (
              <li key={`${education.id}-${index}`} className="mb-8">
                <Heading>{education.title}</Heading>
                <Time fromDate={education.fromDate} toDate={education.toDate} />
                <Text>{education.description}</Text>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
