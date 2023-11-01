type ProjectExperienceItem = {
  id: number;
  title: string;
  slug: string;
  description: string[];
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
    description: [
      "Hansa Borg Bryggerier AS had an inefficient and laborious process for ordering goods for its hospitality customers. In partnership with internal Hansa resources, Knowit developed a portal that enables Hansa’s hospitality customers to order goods without the need for a sales representative.",
      "The portal is constructed using a microservice architecture, with Knowit providing some services and Hansa providing others. All services are hosted on Azure WebApps, and we have utilized Azure B2C for authentication and Azure Search Service for search. The majority of the services are built in Microsoft .NET, while the user interface is a pure React application."
    ],
    summary:
      "Knowit partnered with Hansa Borg Bryggerier AS to develop a digital customer portal using React, ASP.NET Core, and Azure services.",
    startDate: "2017-05",
    endDate: "2018-09",
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
    roles: [
      {
        title: "Full stack developer / Tech lead",
        description:
          "In my capacity as a full-stack developer, I was responsible for both the backend and frontend implementation of this project. Following the project’s delivery and transition to maintenance mode, I assumed the role of tech lead for future development."
      }
    ]
  },
  {
    id: 2,
    title: "BOB BBL — Web and CMS",
    slug: "bob-bbl-web-and-cms",
    description: [
      "BOB web was solved through the development of a newly developed component library along with a modern web app written in React that fetches dynamic content from Umbraco CMS via a headless REST API.",
      "I was responsible for setting up a new .NET package that made Umbraco content available via a REST API. This API was then consumed by a React app that I developed to display the user interface. My primary focus was on Umbraco and setting up the new module, as well as how the content should be integrated with React."
    ],
    summary:
      "Knowit partnered with BOB BBL to develop a new website and CMS using React, Umbraco, and Azure services.",
    startDate: "2018-10",
    endDate: "2019-06",
    technologies: [
      "React",
      "Umbraco",
      "Azure",
      "Azure DevOps",
      "Sass",
      "C#",
      "Microsoft SQL Server",
      "REST",
      "Azure WebApps"
    ],
    images: [
      {
        src: "/images/cv/projects/bob-2.webp",
        alt: "BOB BBL — Web and CMS"
      },
      {
        src: "/images/cv/projects/bob-1.webp",
        alt: "BOB BBL — Web and CMS"
      }
    ],
    roles: [
      {
        title: "Tech Lead",
        description:
          "Consulting regarding React app and headless CMS architecture with Umbraco CMS."
      },
      {
        title: "Senior Developer",
        description:
          "Tommy was responsible for setting up a new .NET package that made Umbraco content available via a REST API. This API was then consumed by a React app that Tommy developed to display the user interface. Tommy's primary focus was on Umbraco and setting up the new module, as well as how the content should be integrated with React."
      }
    ]
  },
  {
    id: 3,
    title: "Compello AS — Web",
    slug: "compello-as-web",
    description: [
      "Compello is a Norwegian company that helps businesses with digitalization and automation of processes within invoice and message exchange. Knowit assists in the development of the company’s digital customer journey. The goal of the project is to make Compello an even more modern and customer-oriented company for the future.",
      "In the fall of 2018, Knowit conducted a pre-project where, through methodical analysis and qualitative insight, they uncovered what challenges and needs existing Compello customers have around the software itself and the surrounding services today, and what they want from Compello and similar vendors in the future. The pre-project revealed that the web experience of Compello should be renewed. The web is designed with Next.js, a React framework, and takes advantage of Server Side Rendering to display content from the Umbraco CMS.",
      "The team consists of a project manager, a UX designer, a front-end developer, a back-end developer, and a tester. The project is run in an agile manner, with a focus on continuous delivery and DevOps.",
      "Tommy's role in the project was as tech lead, front-end developer and back-end developer. He was responsible for setting up the Next.js project and integrating it with Umbraco CMS. He was also responsible for setting up the build and deployment pipeline. Working alongside the UX designer, she was responsible for the design and implementation of the user interface."
    ],
    summary:
      "Knowit partnered with Compello to develop a new website using React, Next.js, and Umbraco.",
    startDate: "2019-03",
    endDate: "2019-09",
    technologies: [
      "React",
      "Next.js",
      "Umbraco",
      "Azure",
      "Azure DevOps",
      "Sass",
      "C#",
      "Microsoft SQL Server",
      "REST",
      "Azure WebApps"
    ],
    images: [
      {
        src: "/images/cv/projects/compello-web.webp",
        alt: "Compello AS — Web"
      },
      {
        src: "/images/cv/projects/compello-web-2.webp",
        alt: "Compello AS — Web"
      }
    ],
    roles: [
      {
        title: "Tech Lead",
        description:
          "Consulting regarding React app and headless CMS architecture with Umbraco CMS."
      },
      {
        title: "Senior Developer",
        description:
          "Tommy was responsible for setting up a new .NET package that made Umbraco content available via a REST API. This API was then consumed by a React app that Tommy developed to display the user interface. Tommy's primary focus was on Umbraco and setting up the new module, as well as how the content should be integrated with React."
      }
    ]
  }
];

export { projectExperienceData };

export type { ProjectExperienceItem };
