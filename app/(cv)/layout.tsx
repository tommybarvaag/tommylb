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

import "@/app/global.css";

function getCvPdfHref() {
  const version = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA;

  if (!version) {
    return "/api/cv/pdf";
  }

  return `/api/cv/pdf?v=${encodeURIComponent(version)}`;
}

type InformationRowProps = {
  label: string;
  value: React.ReactNode;
};

function InformationRow({ label, value }: InformationRowProps) {
  return (
    <div className="flex justify-between border-t border-border py-2 first:border-t-0 first:pt-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function CurriculumVitaeLayout({ children }: { children: React.ReactNode }) {
  const cvPdfHref = getCvPdfHref();
  const informationRows = [
    { label: "Location", value: "Bergen" },
    { label: "Experience", value: `${getActiveWorkYearsAsNumber()}+ years` },
    { label: "Relocation", value: "No" },
    { label: "Native language", value: "Norwegian" },
    { label: "Other languages", value: "English" },
    { label: "Hybrid", value: "Preferred" }
  ];

  return (
    <>
      <Main className="px-6" size="wide">
        <div className="relative items-start gap-10 pb-44 lg:grid lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:px-0">
            <Link
              href="/"
              underline={false}
              className="mt-1 flex items-center text-sm text-muted-foreground hover:text-foreground sm:hidden"
            >
              <Icons.ArrowLeft className="mr-1 size-4" />
              Home
            </Link>
            <div className="flex items-start justify-between gap-4">
              <CvNavigation />
              <Link
                href="/"
                underline={false}
                className="mt-1 hidden items-center text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                <Icons.ArrowLeft className="mr-1 size-4" />
                Home
              </Link>
            </div>
            {children}
          </div>
          <div className="my-8 space-y-5 lg:sticky lg:top-8 lg:my-0 lg:px-0">
            <Card variant="flat">
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
              <CardFooter className="flex-col items-stretch gap-2">
                <a href={cvPdfHref} className={buttonVariants({ variant: "default" })}>
                  <Icons.Download className="mr-2 size-5" />
                  Download CV
                </a>
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
            <Card variant="flat">
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                {informationRows.map(row => (
                  <InformationRow key={row.label} label={row.label} value={row.value} />
                ))}
              </CardContent>
            </Card>
            <Card variant="flat">
              <CardHeader>
                <CardTitle>{cvKeySkills.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row flex-wrap gap-1">
                {cvKeySkills.skills.map((skill, index) => (
                  <Badge variant="outline" key={index}>
                    {skill.title}
                  </Badge>
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
