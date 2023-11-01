import { CvTime } from "@/app/(cv)/cv/_components/cv-time";
import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { getActiveWorkYears } from "@/utils/date-utils";
import Link from "next/link";
import { projectExperienceData } from "../_data/project-experience-data";

function ProjectExperiences() {
  return (
    <>
      <Text>
        I have been fortunate to work with some great clients and companies the last{" "}
        {getActiveWorkYears()}. Below you'll find a selection of the projects I have enjoyed the
        most.
      </Text>
      <Text className="mb-8">Click the project to expand further details.</Text>
      <ol className="mb-12 space-y-4">
        {projectExperienceData
          .sort((a, b) => b.id - a.id)
          .map((projectExperience, index) => {
            return (
              <li
                key={`${projectExperience.slug}-${index}`}
                className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-zinc-700 [&:not(:last-child)]:pb-4"
              >
                <Link key={index} href={`/cv/project/${projectExperience.slug}`}>
                  <Heading variant="h3">{projectExperience.title}</Heading>
                  <CvTime
                    fromDate={projectExperience.startDate}
                    toDate={projectExperience.endDate}
                  />
                  <Text className="text-sm">{projectExperience.summary}</Text>
                </Link>
              </li>
            );
          })}
      </ol>
    </>
  );
}

export { ProjectExperiences };
