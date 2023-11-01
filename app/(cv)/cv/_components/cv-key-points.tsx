import { CvTime } from "@/app/(cv)/cv/_components/cv-time";
import { cvEducation, cvWorkExperience } from "@/app/(cv)/cv/_data/cv-key-points";
import Heading from "@/components/heading";
import Text from "@/components/text";

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
                  <Heading variant="h3">{workPlace}</Heading>{" "}
                  <ol className="relative">
                    {workExperiences.map((workExperience, index) => {
                      return (
                        <li
                          key={`${workExperience.id}-${index}`}
                          className="relative mb-10 ml-6 pl-6 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:left-[4px] [&:not(:last-child)]:before:top-8 [&:not(:last-child)]:before:h-full [&:not(:last-child)]:before:w-px [&:not(:last-child)]:before:bg-zinc-600"
                        >
                          <span className="absolute left-0 top-2 flex h-[8.75px] w-[8.75px] rounded-full bg-zinc-600" />
                          <Heading as="h3">{workExperience.workPlaceTitle}</Heading>
                          <CvTime
                            fromDate={workExperience.fromDate}
                            toDate={workExperience.toDate}
                          />
                          <Text className="text-sm">{workExperience.summary}</Text>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            }

            return (
              <li key={workPlace} className="mb-8">
                <Heading variant="h3">{workPlace}</Heading>{" "}
                <ol className="">
                  {workExperiences.map((workExperience, index) => {
                    return (
                      <li key={`${workExperience.id}-${index}`} className="">
                        <CvTime fromDate={workExperience.fromDate} toDate={workExperience.toDate} />
                        <Heading as="h3">{workExperience.workPlaceTitle}</Heading>
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
        <Heading variant="h2">Education</Heading>
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
