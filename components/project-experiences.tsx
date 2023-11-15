import { CvTime } from "@/components/cv-time";
import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { getActiveWorkYears } from "@/utils/date-utils";
import Link from "next/link";
import { projectExperienceData } from "../data/project-experience-data";
import { Button } from "./button";
import { Icons } from "./icons";

function ProjectExperiences() {
  return (
    <>
      <Text>
        I have been fortunate to work with some great clients and companies the last{" "}
        {getActiveWorkYears()}. Below you will find a selection of the projects I have enjoyed the
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
                  <div className="flex items-start justify-between">
                    <div>
                      <Heading variant="h3" noMargin>
                        {projectExperience.title}
                      </Heading>
                      <Heading className="text-sm text-zinc-400" variant="h4" noMargin>
                        {projectExperience.clientName}
                      </Heading>
                      <CvTime
                        fromDate={projectExperience.startDate}
                        toDate={projectExperience.endDate}
                      />
                    </div>
                    <Button size="sm" variant="ghost">
                      Read more <span className="sr-only">about {projectExperience.title}</span>
                      <Icons.ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <Text variant="small">{projectExperience.summary}</Text>
                </Link>
              </li>
            );
          })}
      </ol>
    </>
  );
}

export { ProjectExperiences };
