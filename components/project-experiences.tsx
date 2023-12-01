import { ProjectExperienceLink } from "@/components/project-experience-link";
import Text from "@/components/text";
import { projectExperienceData } from "@/data/project-experience-data";
import { getActiveWorkYears } from "@/utils/date-utils";

function ProjectExperiences() {
  return (
    <>
      <Text>
        I have been fortunate to work with some great clients and companies the last{" "}
        {getActiveWorkYears()}. Below you will find a selection of the projects I have enjoyed the
        most.
      </Text>
      <Text className="mb-8">Click the project to expand further details.</Text>
      <ol className="group mb-12 space-y-4">
        {projectExperienceData
          .sort((a, b) => b.id - a.id)
          .map((projectExperience, index) => {
            return (
              <li
                key={`${projectExperience.slug}-${index}`}
                className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-zinc-700 [&:not(:last-child)]:pb-4"
              >
                <ProjectExperienceLink
                  key={index}
                  href={`/cv/project/${projectExperience.slug}`}
                  title={projectExperience.title}
                  subtitle={projectExperience.clientName}
                  fromDate={projectExperience.startDate}
                  toDate={projectExperience.endDate}
                  summary={projectExperience.summary}
                />
              </li>
            );
          })}
      </ol>
    </>
  );
}

export { ProjectExperiences };
