import "@/app/global.css";
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
import { CvNavigation } from "@/components/cv-navigation";
import Footer from "@/components/footer";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import Main from "@/components/main";
import { cvKeySkills } from "@/data/cv-key-points";
import { getActiveWorkYearsAsNumber } from "@/utils/date-utils";

export const revalidate = 60;

export default function CurriculumVitaeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Main className="px-6" size="wide">
        <div className="relative items-start gap-10 pb-44 lg:grid lg:grid-cols-3">
          <div className="space-y-5  lg:col-span-2 lg:px-0">
            <CvNavigation />
            {children}
          </div>
          <div className="my-8 space-y-5 lg:sticky lg:top-8 lg:my-0 lg:px-0">
            <Card>
              <CardHeader className="flex flex-row gap-3">
                <Avatar>
                  <AvatarImage
                    src="/images/tommy-zoom-256.webp"
                    alt="Avatar"
                    priority
                    quality={90}
                  />
                  <AvatarFallback>TLB</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Tommy Lunde Barvåg</CardTitle>
                  <CardDescription>Senior front-end specialist</CardDescription>
                </div>
              </CardHeader>
              {/* <CardContent>
                <Badge variant="optimistic">Open for opportunities</Badge>
              </CardContent> */}
              <CardFooter>
                <Link
                  href="/connect"
                  className={buttonVariants({ variant: "subtle" })}
                  underline={false}
                >
                  <Icons.At className="mr-2" />
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
      </Main>
      <Footer size="wide" />
    </>
  );
}
