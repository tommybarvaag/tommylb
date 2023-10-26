import Image from "next/image";
import Link from "next/link";
import { projectExperienceData } from "../_data/project-experience-data";

function ProjectExperiences() {
  return projectExperienceData.map((projectExperience, index) => {
    // safely take first image from images array
    const image = projectExperience.images?.[0] ?? {
      src: "/images/placeholder.png",
      alt: "Placeholder image",
      width: 800,
      height: 400
    };

    return (
      <Link
        key={index}
        href={`/curriculum-vitae/project-experience/${projectExperience.slug}`}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold">{projectExperience.title}</h3>
        <p className="text-sm text-gray-600">
          {projectExperience.startDate} — {projectExperience.endDate}
        </p>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width ?? 800}
          height={image.height ?? 400}
        />
        <p className="text-sm text-gray-600">{projectExperience.summary}</p>
      </Link>
    );
  });
}

export { ProjectExperiences };
