import { CvTime } from "@/app/(cv)/cv/_components/cv-time";
import Heading from "@/components/heading";
import Text from "@/components/text";
import Link from "next/link";
import { projectExperienceData } from "../_data/project-experience-data";

function ProjectExperiences() {
  return (
    <ol className="space-y-4 ">
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
                <CvTime fromDate={projectExperience.startDate} toDate={projectExperience.endDate} />
                <Text>{projectExperience.summary}</Text>
              </Link>
            </li>
          );
        })}
    </ol>
  );
}

export { ProjectExperiences };
