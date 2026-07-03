import { CvDateRangeTime, StackedCvTime } from "@/components/cv-time";
import { Heading } from "@/components/heading";
import { SectionLabel } from "@/components/section-label";
import Text from "@/components/text";

import { cvEducation, cvWorkExperience } from "@/data/cv-key-points";

function CvKeyPoints() {
  const workExperiences = cvWorkExperience.toSorted((a, b) => b.id - a.id);

  return (
    <>
      <section>
        <ol>
          {workExperiences.map(workExperience => (
            <li
              key={workExperience.id}
              className="grid grid-cols-[8rem_1fr] gap-x-7 border-t border-border py-5 first:border-t-0 first:pt-0"
            >
              <StackedCvTime fromDate={workExperience.fromDate} toDate={workExperience.toDate} />
              <div>
                <Heading variant="h3" noMargin className="font-semibold">
                  {workExperience.workPlaceTitle}
                </Heading>
                <Text variant="small" noMargin className="pt-0.5 text-muted-foreground">
                  {workExperience.workPlace}
                </Text>
                <Text variant="small" noMargin className="pt-2 text-olive-700 dark:text-olive-200">
                  {workExperience.summary}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-8">
        <SectionLabel className="mb-4">Education</SectionLabel>
        <ul>
          {cvEducation.map(education => (
            <li key={education.id} className="grid grid-cols-[8rem_1fr] gap-x-7 py-1">
              <CvDateRangeTime fromDate={education.fromDate} toDate={education.toDate} />
              <div>
                <Heading variant="h3" noMargin>
                  {education.title}
                </Heading>
                {education.description ? (
                  <Text
                    variant="small"
                    noMargin
                    className="pt-2 text-olive-700 dark:text-olive-200"
                  >
                    {education.description}
                  </Text>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export { CvKeyPoints };
