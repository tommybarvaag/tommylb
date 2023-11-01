import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { buttonVariants } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/card";
import Link from "@/components/link";
import { getActiveWorkYearsAsNumber } from "@/utils/date-utils";
import "styles/global.css";
import { CvNavigation } from "./cv/_components/cv-navigation";
import { cvKeySkills } from "./cv/_data/cv-key-points";

export default function CurriculumVitaeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl pt-24">
      <div className="relative items-start gap-10 lg:grid lg:grid-cols-3">
        <div className="space-y-5 px-6 lg:col-span-2 lg:px-0">
          <CvNavigation />
          {children}
        </div>
        <div className="space-y-5 px-6 lg:sticky lg:top-8 lg:px-0">
          <Card>
            <CardHeader className="flex flex-row gap-3">
              <Avatar>
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/24416970?v=4"
                  alt="Avatar"
                  className="user-photo"
                />
                <AvatarFallback>TLB</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Tommy Lunde Barvåg</CardTitle>
                <CardDescription>Senior front-end specialist</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="">
              <Badge variant="optimistic">Open for opportunities</Badge>
            </CardContent>
            <CardFooter>
              <Link
                href="/connect"
                className={buttonVariants({ variant: "default" })}
                underline={false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                Contact me
              </Link>
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
                <span className="text-sm text-zinc-400">Availability</span>
                <span className="text-right text-sm font-medium text-zinc-200">1 week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Relocation</span>
                <span className="text-right text-sm font-medium text-zinc-200">No</span>
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
  );
}
