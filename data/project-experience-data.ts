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
      "Hansa Borg Bryggerier AS had an inefficient and laborious process for ordering goods for its hospitality customers. In partnership with internal Hansa resources, Knowit developed a portal that enables Hansa's hospitality customers to order goods without the need for a sales representative.",
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
  },
  {
    id: 4,
    title: "Hansa Borg Bryggerier AS — olden.no",
    slug: "hansa-borg-bryggerier-as-olden-no",
    description: [
      "The brand Olden is owned by Hansa Borg Bryggerier AS. Olden is a brand that has been on the market for many years, and has a strong position in the Norwegian market. The brand is known for its high quality and good taste. The brand is available in several variants, including sparkling water, still water, and flavored water.",
      "Hansa Borg wanted to renew existing pages for Olden in connection with the relaunch of existing and new products. UX and design were delivered by Knowit.",
      "olden.no is developed with Next.js, a React framework, and Sanity to deliver structured content. The pages available on the web are generated as static content when the page is built in Azure DevOps and updated at regular intervals so that we ensure that the data is “pre-chewed” when the user asks for it. This results in a fast, responsive, and smooth website for the end-user."
    ],
    summary:
      "Hansa Borg wanted to renew existing pages for Olden in connection with the relaunch of existing and new products.",
    startDate: "2020-05",
    endDate: "2020-06",
    technologies: ["React", "Next.js", "Sanity", "Azure", "Azure DevOps", "Sass", "Azure WebApps"],
    images: [
      {
        src: "/images/cv/projects/olden.webp",
        alt: "Hansa Borg Bryggerier AS — olden.no"
      },
      {
        src: "/images/cv/projects/olden-2.webp",
        alt: "Hansa Borg Bryggerier AS — olden.no"
      },
      {
        src: "/images/cv/projects/olden-3.webp",
        alt: "Hansa Borg Bryggerier AS — olden.no"
      },
      {
        src: "/images/cv/projects/olden-4.webp",
        alt: "Hansa Borg Bryggerier AS — olden.no"
      }
    ],
    roles: [
      {
        title: "Tech Lead",
        description:
          "Technical consulting before, during, and after delivery. Development of component libraries, web app in Next.js, and Sanity CMS."
      }
    ]
  },
  {
    id: 5,
    title: "Hansa Borg Bryggerier AS — Digital Customer Portal v2",
    slug: "hansa-borg-bryggerier-as-digital-customer-portal-v2",
    description: [
      "Hansa Borg Bryggerier AS had an inefficient and laborious process for ordering goods for its hospitality customers. In partnership with internal Hansa resources, Knowit developed a portal that enables Hansa's hospitality customers to order goods without the need for a sales representative.",
      "The portal is constructed using a microservice architecture, with Knowit providing some services and Hansa providing others. All services are hosted on Azure WebApps, and we have utilized Azure B2C for authentication and Azure Search Service for search. The majority of the services are built in Microsoft .NET, while the user interface is a pure React application.",
      "My role as a tech load and senior front-end specialist was to refine the existing codebase and implement new features and improvements. Going from a Redux focused Create React App (CRA) with SASS to a Single Page Application (SPA) with Vite, React Query, and Tailwind CSS. I also concatenated the existing UI components into a more refined and reusable component library to ensure uniformity and consistency across the application.",
      "Porting and improving the existing microservices from .NET Framework to .NET Core (now .NET 6). Creating automated build and deployment pipelines for the microservices and the React application."
    ],
    summary:
      "Refining and improving the existing Digital Customer Portal. Going from a Redux focused Create React App (CRA) with SASS to a Single Page Application (SPA) with Vite, React Query, and Tailwind CSS.",
    startDate: "2020-02",
    endDate: "2023-12",
    technologies: [
      "React",
      "Vite",
      "Azure",
      "Azure DevOps",
      "Tailwind CSS",
      "C#",
      "Microservices",
      "Microsoft SQL Server",
      "Azure Search Index",
      "Azure B2C",
      "Azure WebApps"
    ],
    images: [
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-digital-customer-portal-v2.webp",
        alt: "Hansa Borg Bryggerier AS — Digital Customer Portal v2"
      },
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-digital-customer-portal-v2-2.webp",
        alt: "Hansa Borg Bryggerier AS — Digital Customer Portal v2"
      },
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-digital-customer-portal-v2-3.webp",
        alt: "Hansa Borg Bryggerier AS — Digital Customer Portal v2"
      }
    ],
    roles: [
      {
        title: "Tech Lead",
        description:
          "Technical consulting before, during, and after delivery. Development of component libraries, upgrading microservices from .NET Framework to .NET Core (now .NET 6), and web app in React."
      },
      {
        title: "Senior Front-end Specialist",
        description:
          "Refining and improving the existing Digital Customer Portal. Going from a Redux focused Create React App (CRA) with SASS to a Single Page Application (SPA) with Vite, React Query, and Tailwind CSS."
      }
    ]
  },
  {
    id: 6,
    title: "Hansa Borg Bryggerier AS — Onboarding wizard",
    slug: "hansa-borg-bryggerier-as-onboarding-wizard",
    description: [
      "With a steadily increasing customer portfolio, Hansa Borg Bryggerier AS wanted a new and more flexible way to onboard new customers. The goal was to collect and save customer leads in Microsoft Dynamics, and to make it easier for the sales department to follow up on these leads. The solution was to develop a new onboarding wizard that would be integrated with the existing Digital Customer Portal.",
      "Together with UX/UI Lead at Knowit Experience, Erlend Damm, we have developed a digital solution that makes it easier for customers to get started using the trading portal.",
      "My role as a senior front-end specialist was to develop the onboarding wizard in React. The wizard is built using React, React Hook From, TypeScript, and Tailwind CSS. The wizard is integrated with the existing Digital Customer Portal and is hosted on Azure WebApps."
    ],
    summary:
      "To solve the problem of onboarding new customers, we developed a new onboarding wizard in React with persistent storage in Microsoft Dynamics.",
    startDate: "2021-02",
    endDate: "2021-06",
    technologies: [
      "React",
      "Azure",
      "Azure DevOps",
      "Tailwind CSS",
      "C#",
      "Microsoft Dynamics",
      "Azure WebApps"
    ],
    images: [
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-onboarding-wizard.webp",
        alt: "Hansa Borg Bryggerier AS — Onboarding wizard"
      },
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-onboarding-wizard-2.webp",
        alt: "Hansa Borg Bryggerier AS — Onboarding wizard"
      },
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-onboarding-wizard-3.webp",
        alt: "Hansa Borg Bryggerier AS — Onboarding wizard"
      },
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-onboarding-wizard-4.webp",
        alt: "Hansa Borg Bryggerier AS — Onboarding wizard"
      }
    ],
    roles: [
      {
        title: "Senior Front-end Specialist",
        description: "Development of the onboarding wizard in React."
      }
    ]
  },
  {
    id: 7,
    title: "Hansa Borg Bryggerier AS — Beer as a Service",
    slug: "hansa-borg-bryggerier-as-beer-as-a-service",
    description: [
      "Hansa Borg Bryggerier AS is Norway's largest Norwegian-owned brewery and beverage company with around 300 employees. The company is facing increasing price pressure while trying to differentiate itself on service, leading to a negative spiral of lower revenues and higher costs. In the market, there is a proliferation of chains: International chains have their suppliers and are almost impossible to penetrate. Norwegian chains are easier to approach. There are also purchasing groups that put pressure on prices. At the same time, HBB sees self-service as a trend and things are being automated. The industry is moving from products to services.",
      "HBB saw a need to innovate to increase profitability in the nightlife segment and to better connect with customers to better meet the changes the industry faces. Therefore, in the fall of 2020, they decided to engage Knowit to identify needs, innovation potential, and associated innovation solutions.",
      "Tommy started working on developing a web application based on the graphic profile designed in the fall of 2021. Unfortunately the project was put on ice following the acquisition by Royal Unibrew AS in 2023.",
      "The web application is built using React, Next.js, TypeScript, Tailwind CSS, Azure, and Azure DevOps. Utilizing the latest and greatest technologies to create a modern and scalable web application with PWA capabilities. My role as a tech lead and senior front-end specialist was to develop the web application in React. The web application was integrated with the a series of IoT microservices developed by Hansa Borg Bryggerier AS. The microservices was connected to a host of datacenters that concatinated data from the IoT devices and sent it to the web application via a REST API. Data collected from the IoT devices was used to display real-time data in the web application."
    ],
    summary:
      "HBB saw a need to innovate to increase profitability in the nightlife segment and to better connect with customers to better meet the changes the industry faces. Utilizing the latest and greatest technologies Tommy created a modern and scalable web application with PWA capabilities to expose a data driven nightlife experience.",
    startDate: "2022-01",
    endDate: "2023-01",
    technologies: [
      "React",
      "Next.js",
      "Azure",
      "Azure DevOps",
      "Tailwind CSS",
      "C#",
      "Microservices",
      "Microsoft SQL Server",
      "REST",
      "Azure WebApps",
      "IoT"
    ],
    images: [
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-beer-as-a-service.webp",
        alt: "Hansa Borg Bryggerier AS — Beer as a Service"
      },
      {
        src: "/images/cv/projects/hansa-borg-bryggerier-as-beer-as-a-service-2.webp",
        alt: "Hansa Borg Bryggerier AS — Beer as a Service"
      }
    ],
    roles: [
      {
        title: "Tech Lead",
        description:
          "Technical consulting before, during, and after delivery. Development of component libraries, web app in React, and integration with IoT microservices."
      },
      {
        title: "Senior Front-end Specialist",
        description: "Development of the web application in React."
      }
    ]
  }
];

export { projectExperienceData };

export type { ProjectExperienceItem };
