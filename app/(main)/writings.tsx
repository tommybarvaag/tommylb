import { Heading } from "@/app/_components/ui/heading";
import { Link } from "@/app/_components/ui/link";
import * as WritingsService from "@/app/_lib/services/writings-service";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { unstable_ViewTransition as ViewTransition } from "react";

export async function Writings() {
  "use cache";

  cacheLife("weeks");
  cacheTag("writings");

  const writings = await WritingsService.getWritings();

  return (
    <ViewTransition name="writings">
      <Heading>Writings</Heading>
      <ul className="list-disc space-y-1 pl-5">
        {writings.map(writing => (
          <li key={writing.slug}>
            <Link href={writing.slug}>{writing.title}</Link>
          </li>
        ))}
      </ul>
    </ViewTransition>
  );
}
