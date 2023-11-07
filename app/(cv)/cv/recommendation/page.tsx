import { Heading } from "@/components/heading";
import Text from "@/components/text";
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
      ...recommendation,
      date: new Date(recommendation.date)
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="duration-500 animate-in">
      <ol className="space-y-8">
        {recommendations.map((recommendation, index) => (
          <li key={`recommendation-${index}`}>
            <Heading variant="h2" noMargin>
              {recommendation.name}
            </Heading>
            <Heading className="text-sm text-zinc-400" variant="h3" noMargin>
              {recommendation.title} at {recommendation.company} —{" "}
              {recommendation.date.toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric"
              })}
            </Heading>
            {/* lh: 2.25rem */}
            {/* ls: -.025em */}
            <blockquote className="mt-2 leading-relaxed tracking-tight">
              {recommendation.description.map((desc, index) => (
                <Text className="text-[15px] [&:not(:first-child)]:mt-2" key={`desc-${index}`}>{`${
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
