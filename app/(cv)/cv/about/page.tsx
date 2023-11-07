import Link from "@/components/link";
import Text from "@/components/text";
import { getActiveWorkYears } from "@/utils/date-utils";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";
import type { Metadata } from "next";

export const metadata: Metadata = metadataWithCustomOgImage(
  "About",
  "Tommy is an experienced and solution-oriented consultant with expertise in JavaScript/TypeScript and React. He has a systematic and analytical approach to developing custom solutions from concept to product.",
  "Curriculum Vitae — About",
  "An experienced and solution-oriented senior consultant"
);

export default async function CvAboutPage() {
  return (
    <div className="duration-500 animate-in">
      <Text>
        Tommy is an experienced and solution-oriented senior consultant with expertise in
        JavaScript/TypeScript and React. He has a systematic and analytical approach to developing
        custom solutions from concept to product.
      </Text>
      <Text>
        With over{" "}
        <Link href="/cv/experience">{getActiveWorkYears()} of experience in web technology</Link>,
        Tommy has developed a deep understanding of creating seamless user experiences. He
        specializes in React, Next.js, Sanity, and other JavaScript libraries/frameworks, but also
        has extensive experience with C# and .NET.
      </Text>
      <Text>
        Tommy has broad experience as a tech lead and is known for asking the right questions and
        digging deep to ensure that the end product delivers the best possible results.
      </Text>
      <Text>
        Working with several great companies and clients, including Hansa Borg Bryggerier AS, BOB
        BBL AS and Compello AS to name a few. In collaboration we have created{" "}
        <Link href="/cv/project">great projects and solutions</Link> that we&apos;re truly proud of.
      </Text>
      <Text>
        If Tommy could choose from the top shelf regarding his next project, he would choose a role
        where he could spearhead the development of a new product or service. He would also like to
        work with a team that is passionate about creating great user experiences with a strong
        focus on quality. Using techlogies that he adore, like React, Next.js, Sanity, TypeScript,
        and Tailwind CSS.
      </Text>
      <Text>
        Reach out via my <Link href="/connect">contact form</Link>, find me on{" "}
        <Link href="https://www.linkedin.com/in/tommybarvaag/">LinkedIn</Link> or simply drop me an
        email at <Link href="mailto:tommy@barvaag.com">tommy@barvaag.com</Link>.
      </Text>
    </div>
  );
}
