import { FormatDate } from "@/app/_components/ui/date";
import { Heading } from "@/app/_components/ui/heading";
import { Text } from "@/app/_components/ui/text";
import { cvRecommendations } from "@/data/cv-key-points";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = metadataWithCustomOgImage(
  "Project Experiences",
  "Recommendation",
  "Curriculum Vitae — Recommendation",
  "An experienced and solution-oriented senior consultant"
);

export default async function Recommendation() {
  const recommendations = cvRecommendations
    .map(recommendation => ({
      ...recommendation
    }))
    .sort((a, b) => b.id - a.id);

  return (
    <div className="animate-in duration-500">
      <ol className="space-y-8">
        {recommendations.map((recommendation, index) => (
          <li key={`recommendation-${index}`}>
            <Heading noMargin>{recommendation.name}</Heading>
            <Heading className="text-sm text-zinc-400" noMargin>
              {recommendation.title} at {recommendation.company} —{" "}
              <FormatDate date={recommendation.date} />
            </Heading>
            <blockquote className="mt-2 leading-relaxed tracking-tight">
              {recommendation.description.map((desc, index) => (
                <Text className="text-[15px] not-first:mt-2" key={`desc-${index}`}>{`${
                  index === 0 ? "“" : ""
                }${desc}${index === recommendation.description.length - 1 ? "”" : ""}`}</Text>
              ))}
            </blockquote>
          </li>
        ))}
      </ol>
    </div>
  );
}
