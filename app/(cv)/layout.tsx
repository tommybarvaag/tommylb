import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/app/_components/ui/card";
import "@/app/global.css";
import { cvKeySkills } from "@/data/cv-key-points";
import * as DateUtils from "@/utils/date-utils";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import Link from "next/link";

async function getActiveWorkYearsAsNumber() {
  "use cache";

  cacheLife("weeks");

  return DateUtils.getActiveWorkYearsAsNumber();
}

export default function CurriculumVitaeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="px-6">
        <div className="relative items-start gap-10 pb-44 lg:grid lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2 lg:px-0">{children}</div>
          <div className="my-8 space-y-5 lg:sticky lg:top-8 lg:my-0 lg:px-0">
            <Card>
              <CardHeader className="flex flex-row gap-3">
                <div>
                  <CardTitle>Tommy Lunde Barvåg</CardTitle>
                  <CardDescription>Senior front-end specialist</CardDescription>
                </div>
              </CardHeader>
              <CardFooter>
                <Link href="/connect">Contact me</Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Location</span>
                  <span className="text-right text-sm font-medium text-zinc-200">Bergen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Experience</span>
                  <span className="text-right text-sm font-medium text-zinc-200">
                    {`${getActiveWorkYearsAsNumber()}+ years`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Relocation</span>
                  <span className="text-right text-sm font-medium text-zinc-200">No</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Native language</span>
                  <span className="text-right text-sm font-medium text-zinc-200">Norwegian</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Other languages</span>
                  <span className="text-right text-sm font-medium text-zinc-200">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Hybrid</span>
                  <span className="text-right text-sm font-medium text-zinc-200">Preferred</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{cvKeySkills.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row flex-wrap gap-1">
                {cvKeySkills.skills.map((skill, index) => (
                  <Badge key={index}>{skill.title}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
