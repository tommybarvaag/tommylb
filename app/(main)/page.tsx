import { Heading } from "@/app/_components/ui/heading";
import { Text } from "@/app/_components/ui/text";
import * as WritingsService from "@/app/_lib/services/writings-service";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

async function Writings() {
  "use cache";

  cacheLife("weeks");
  cacheTag("writings");

  const writings = await WritingsService.getWritings();

  return (
    <>
      <Heading>Writings</Heading>
      {writings.map(writing => (
        <div key={writing.slug}>
          <a href={writing.slug}>{writing.title}</a>
        </div>
      ))}
    </>
  );
}

export default async function Home() {
  return (
    <>
      <div className="mb-12 w-full">
        <Heading>Tommy Lunde Barvåg</Heading>
        <div>
          <Text>{/* <ActiveWorkYears /> */}</Text>
          <Text>
            I&apos;m currently working as a senior system developer at{" "}
            <a href="https://investor.elmeragroup.no/" target="_blank" rel="noopener noreferrer">
              Elmera Group
            </a>
            .
          </Text>
        </div>
      </div>
      <div className="mb-12">
        <Writings />
      </div>
      <div className="mb-12">
        <Heading>Current</Heading>
        <Text>
          Developing skill through exploring and building, living for the bleeding edge. I&apos;m a
          big fan of the web and all the possibilities it offers.
        </Text>
        <Text>
          I love building websites and web applications. I excel at{" "}
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
          and other modern web technologies.
        </Text>
        <Text>
          I spend my free time with my live-in girlfriend, daughter and son, coding hobby projects,
          taking runs around Bergen, and enjoying time with friends.
        </Text>
      </div>
    </>
  );
}
