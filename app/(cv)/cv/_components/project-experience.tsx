"use client";

import { CvTime } from "@/app/(cv)/cv/_components/cv-time";
import { type ProjectExperienceItem } from "@/app/(cv)/cv/_data/project-experience-data";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";

function ProjectExperience({ projectExperience }: { projectExperience: ProjectExperienceItem }) {
  const router = useRouter();
  return (
    <>
      <Drawer.Root
        open
        onOpenChange={open => {
          if (!open) {
            router.back();
          }
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 mx-auto mt-24 flex h-full max-h-[96%] max-w-[1080px] flex-col rounded-t-[10px] bg-zinc-900">
            <div className="relative z-10 flex-1 overflow-auto rounded-t-[10px]">
              <Drawer.Close asChild>
                <Button className="fixed right-3 top-3 z-20 h-10 w-10 rounded-full p-0">
                  <Icons.X className="h-6 w-6" />
                </Button>
              </Drawer.Close>
              <div className="relative h-[280px] w-full md:h-[480px] lg:h-[680px]">
                <Image
                  className="select-none rounded-t-[10px] brightness-75"
                  src={projectExperience.images?.[0].src}
                  alt={projectExperience.images?.[0].alt}
                  fill
                  objectFit="cover"
                  objectPosition="center top"
                />
              </div>
              <div className="my-8 px-8 md:px-12 lg:px-24">
                <Drawer.Title asChild>
                  <div className="flex justify-between text-xl font-bold">
                    <Heading as="h1" variant="pageHeading" className="text-xl font-bold">
                      {projectExperience.title}
                    </Heading>
                    <CvTime
                      fromDate={projectExperience.startDate}
                      toDate={projectExperience.endDate}
                    />
                  </div>
                </Drawer.Title>
                <Drawer.Description>
                  {projectExperience.description.map((desc, index) => (
                    <Text key={`desc-${index}`}>{desc}</Text>
                  ))}
                </Drawer.Description>
                <div className="mb-8">
                  <Heading as="h3" className="text-lg font-semibold">
                    Roles
                  </Heading>
                  <ul className="">
                    {projectExperience.roles.map((role, index) => (
                      <li key={`${role.title}-${index}`}>
                        <div>{role.title}</div>
                        <Text>{role.description}</Text>
                      </li>
                    ))}
                  </ul>
                  <Heading as="h3" className="text-lg font-semibold">
                    Technology
                  </Heading>
                  <ul className="flex flex-wrap gap-1">
                    {projectExperience.technologies.map((technology, index) => (
                      <li key={`${technology}-${index}`}>
                        <Badge>{technology}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className="text-xl font-semibold">Screenshots</h3>
                <div className="grid grid-cols-1 gap-y-6">
                  {projectExperience.images?.map((image, index) => (
                    <Image
                      key={`${image.src}-${index}`}
                      className="select-none rounded-[10px]"
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 800}
                      height={image.height ?? 400}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-auto h-24 border-t border-zinc-800 bg-zinc-900 p-4"></div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export { ProjectExperience };
