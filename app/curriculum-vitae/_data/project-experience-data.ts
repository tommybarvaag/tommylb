type ProjectExperienceItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  summary: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  images: {
    src: string;
    alt: string;
    height?: number;
    width?: number;
  }[];
  responsibilities: string[];
  roles: {
    title: string;
    description: string;
  }[];
};

const projectExperienceData: ProjectExperienceItem[] = [
  {
    id: 1,
    title: "Hansa Borg Bryggerier AS — Digital customer portal",
    slug: "hansa-borg-bryggerier-as-digital-customer-portal",
    description:
      "Hansa Borg Bryggerier AS had an inefficient and laborious process for ordering goods for its hospitality customers. In partnership with internal Hansa resources, Knowit developed a portal that enables Hansa’s hospitality customers to order goods without the need for a sales representative. The portal is constructed using a microservice architecture, with Knowit providing some services and Hansa providing others. All services are hosted on Azure WebApps, and we have utilized Azure B2C for authentication and Azure Search Service for search. The majority of the services are built in Microsoft .NET, while the user interface is a pure React application.",
    summary:
      "Knowit partnered with Hansa Borg Bryggerier AS to develop a digital customer portal using React, ASP.NET Core, and Azure services.",
    startDate: "2021-01-01",
    endDate: "2021-01-01",
    technologies: [
      "React",
      "ASP.NET Core",
      "Azure",
      "Azure DevOps",
      "Sass",
      "C#",
      "Microservices",
      "Microsoft SQL Server",
      "Azure Search Index",
      "Azure B2C",
      "Azure WebApps"
    ],
    images: [
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-digital-customer-portal.webp",
        alt: "Hansa Borg Bryggerier AS — Digital customer portal"
      }
    ],
    responsibilities: [
      "React app with Redux",
      "ASP.NET Core microservices",
      "Microsoft DevOps",
      "Microsoft Azure",
      "Automated builds"
    ],
    roles: [
      {
        title: "Full stack developer / Tech lead",
        description:
          "In my capacity as a full-stack developer, I was responsible for both the backend and frontend implementation of this project. Following the project’s delivery and transition to maintenance mode, I assumed the role of tech lead for future development."
      }
    ]
  }
];

export { projectExperienceData };

export type { ProjectExperienceItem };
