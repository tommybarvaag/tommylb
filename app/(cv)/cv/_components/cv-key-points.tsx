import { CvTime } from "@/app/(cv)/cv/_components/cv-time";
import { cvEducation, cvWorkExperience } from "@/app/(cv)/cv/_data/cv-key-points";
import { Heading } from "@/components/heading";
import Text from "@/components/text";
import {
  ListItemWithTimeline,
  ListItemWithTimelineDescription,
  ListItemWithTimelineTime,
  ListItemWithTimelineTitle
} from "./cv-list-item-with-timeline";

function CvKeyPoints() {
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
    <>
      <section>
        <ol className="">
          {Object.entries(workExperiencesByWorkPlace).map(([workPlace, workExperiences]) => {
            if (workExperiences.length > 1) {
              return (
                <li key={workPlace} className="mb-8">
                  <Heading className="mb-3 text-lg" variant="h2">
                    {workPlace}
                  </Heading>
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
                <Heading className="mb-3 text-lg" variant="h2">
                  {workPlace}
                </Heading>
                <ol className="">
                  {workExperiences.map((workExperience, index) => {
                    return (
                      <li key={`${workExperience.id}-${index}`} className="">
                        <Heading variant="h3">{workExperience.workPlaceTitle}</Heading>
                        <CvTime fromDate={workExperience.fromDate} toDate={workExperience.toDate} />
                        <Text className="text-sm">{workExperience.summary}</Text>
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
        <Heading className="mb-3 text-lg" variant="h2">
          Education
        </Heading>
        <ul className="">
          {cvEducation.map((education, index) => {
            return (
              <li key={`${education.id}-${index}`} className="mb-8">
                <Heading variant="h3">{education.title}</Heading>
                <CvTime fromDate={education.fromDate} toDate={education.toDate} />
                <Text>{education.description}</Text>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export { CvKeyPoints };
