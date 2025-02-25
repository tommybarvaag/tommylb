import { Heading } from "@/app/_components/ui/heading";
import { Link } from "@/app/_components/ui/link";
import { Text } from "@/app/_components/ui/text";
import * as WritingsService from "@/app/_lib/services/writings-service";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { ActiveWorkYears } from "../_components/active-work-years";
import { SiteAnchor } from "../_components/site-anchor";

async function Writings() {
  "use cache";

  cacheLife("weeks");
  cacheTag("writings");

  const writings = await WritingsService.getWritings();

  return (
    <>
      <Heading>Writings</Heading>
      <ul className="list-disc space-y-1 pl-5">
        {writings.map(writing => (
          <li key={writing.slug}>
            <Link href={writing.slug}>{writing.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default async function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <SiteAnchor />
        <ActiveWorkYears />
        <Text>
          I&apos;m currently working as a senior system developer at{" "}
          <a href="https://investor.elmeragroup.no/" target="_blank" rel="noopener noreferrer">
            Elmera Group
          </a>
          .
        </Text>
      </div>
      <div className="space-y-6">
        <Writings />
      </div>
      <div className="space-y-6">
        <Heading>Current</Heading>
        <Text>
          Passionate about exploring and building, I thrive on the bleeding edge of technology. The
          web fascinates me with its endless possibilities, and I love creating intuitive,
          high-performing websites and applications.
        </Text>
        <Text>
          My expertise lies in{" "}
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
            TypeScript
          </a>
          ,{" "}
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>
          ,{" "}
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
            Next.js
          </a>{" "}
          , and modern web technologies, where I excel at crafting seamless user experiences.
        </Text>
        <Text>
          Outside of work, I spend my time with my girlfriend, daughter, and son, working on hobby
          projects, running through the streets of Bergen, and enjoying good times with friends.
        </Text>
      </div>
    </div>
  );
}
