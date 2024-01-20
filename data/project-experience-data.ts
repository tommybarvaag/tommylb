type ProjectExperienceItem = {
  id: number;
  title: string;
  clientName: string;
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
    bannerObjectPosition?: "top" | "center" | "bottom";
  }[];
  roles: {
    title: string;
    description: string;
  }[];
};

const projectExperienceData: ProjectExperienceItem[] = [
  {
    id: 1,
    title: "Digital customer portal",
    clientName: "Hansa Borg Bryggerier AS",
    slug: "hansa-borg-bryggerier-as-digital-customer-portal",
    description: [
      "Hansa Borg Bryggerier AS had an inefficient and laborious process for ordering goods for its nightlife customers. In partnership with internal Hansa resources, Knowit developed a portal that enables Hansa's nightlife customers to order goods without the need for a sales representative.",
      "The portal is constructed using a microservice architecture, with Knowit providing some services and Hansa providing others. All services are hosted on Azure WebApps, and we have utilized Azure B2C for authentication and Azure Search Service for search. The majority of the services are built in Microsoft .NET, while the user interface is a pure React application."
    ],
    summary:
      "Hansa Borg Bryggerier AS wanted to develop a digital customer portal to streamline the ordering process for its nightlife customers. Knowit was responsible for the development of the portal using React, ASP.NET Core, and Azure services.",
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
    title: "New web and CMS",
    clientName: "BOB BBL AS",
    slug: "bob-bbl-web-and-cms",
    description: [
      "BOB BBL AS, a renowned housing cooperative in Norway, embarked on an initiative to upgrade their digital presence. The project aimed to enhance their web interface, ensuring that it not only met the modern standards of web development but also provided an exceptional user experience.",
      "The primary objective was to create a new component library and a modern web application using React. This application was designed to fetch dynamic content from Umbraco CMS through a headless REST API, allowing for more flexible and efficient content management.",
      "The project team was a blend of experienced professionals, including four developers, two UX designers from Knowit Experience Bergen AS, a project manager and tester from Knowit, and a product owner from BOB BBL AS. This diverse team utilized Agile methodology, enabling a collaborative and adaptive approach to the project.",
      "As a seasoned developer, Tommy led the development of a new .NET package, crucial for making Umbraco content accessible via a REST API. This API played a vital role in the React application that Tommy developed for displaying the user interface. His primary focus was not only on the integration of Umbraco with the new module but also on how its content would be seamlessly integrated with React.",
      "Tommy was also responsible for setting up the initial React shell and defining the rendering logic for the JSON data returned from the headless Umbraco REST API. His expertise was evident in the way he handled discussions with other developers about the component library and various UI solutions, offering guidance and insights that only come with years of experience in the field.",
      "Under Tommy's guidance, the project successfully achieved its goals, creating a web presence for BOB BBL AS that was both aesthetically pleasing and functionally robust. His innovative approach to integrating .NET, Umbraco, and React not only streamlined content management processes but also elevated the overall user experience on the website. The project stood as a testament to Tommy's technical acumen and his ability to lead and innovate in complex web development projects."
    ],
    summary:
      "Knowit was responsible for the development of a new web and CMS solution for BOB BBL AS using React, Umbraco, and Azure services.",
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
    title: "New web and CMS",
    clientName: "Compello AS",
    slug: "compello-as-web",
    description: [
      "Compello AS is a Norwegian company specializing in digitalization and automation of invoice and message exchange processes. The collaboration with Knowit aimed to further enhance Compello's digital customer journey, positioning the company as a more modern and customer-centric company for the future.",
      "In the fall of 2018, Knowit initiated a pre-project involving a methodical analysis and qualitative insights to understand the challenges and needs of Compello's existing customers regarding their software and surrounding services. This comprehensive analysis led to the revelation that Compello's web experience required a significant overhaul. The project was centered around designing a web presence using Next.js, a React framework, and leveraging Server Side Rendering (SSR) to dynamically showcase content from the Umbraco CMS.",
      "The project team comprised a project manager, a UX designer, Tommy as the front-end and back-end developer, and a tester. This agile team focused on continuous delivery and DevOps practices to ensure a responsive and efficient development process.",
      "As the tech lead and primary developer for both front-end and back-end, Tommy played a critical role in the project's success. His responsibilities included establishing the Next.js project and integrating it seamlessly with the Umbraco CMS. He adeptly set up the build and deployment pipeline, ensuring a smooth and reliable delivery process.",
      "Working closely with the UX designer, Tommy was instrumental in designing and implementing a user interface that not only met but exceeded user expectations. He creatively utilized the capabilities of Next.js SSR, preloading and prefetching links within the viewport to fetch page data and store it in a Redux cache. This innovative approach ensured snappy page navigation and an SSR experience that felt truly static without sacrificing dynamic content.",
      "Under Tommy's guidance, the webpage not only garnered appreciation for its design and functionality but also achieved impressive SEO results. His ability to blend technical expertise with creative solutions was pivotal in transforming Compello's web presence, making it more engaging and user-friendly. This project not only demonstrated Tommy's technical skills but also showcased his ability to lead and innovate in a rapidly evolving digital landscape, laying a strong foundation for Compello's future digital endeavors."
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
    title: "olden.no",
    clientName: "Hansa Borg Bryggerier AS",
    slug: "hansa-borg-bryggerier-as-olden-no",
    description: [
      "Hansa Borg Bryggerier AS, the owner of the esteemed Olden brand, holds a significant market presence in Norway, known for its high-quality beverages including sparkling, still, and flavored water. The Olden brand, with its longstanding history, is synonymous with exceptional taste and quality.",
      "In a strategic move to revitalize the Olden brand, Hansa Borg Bryggerier AS embarked on a project to revamp the Olden website, aligning it with the relaunch of their existing and new product lines. The initiative was aimed at establishing a fresh visual identity, enhancing user experience, and improving product presentation on the web.",
      "Tommy, as the sole developer, collaborated effectively with a UX designer from Knowit Experience Bergen AS, a project manager from Knowit, and a product owner from Hansa Borg. This streamlined team, adept in Agile (Scrum) methodologies, worked in unison to deliver a cohesive and impactful digital solution.",
      "As a seasoned front-end developer, Tommy was the driving force behind the development of the new Olden.no website. Utilizing Next.js, a React framework, and Sanity for content management, he crafted a site that was not only visually appealing but also technologically advanced. His expertise in Next.js facilitated the creation of static pages, rendering impressive response times and contributing to superior SEO performance.",
      "Tommy's meticulous approach to the project included transferring relevant information from the old CMS (EPiServer) to the new CMS (Sanity), ensuring a smooth transition without compromising content integrity. The synergy between Next.js and Sanity enabled the delivery of a website that was fast, responsive, and user-friendly. His focus on key aspects such as SEO, accessibility, performance, maintainability, test coverage, and documentation highlighted his comprehensive understanding of modern web development standards.",
      "The result was a website that not only met but exceeded expectations in terms of speed, responsiveness, and user experience. The project showcased Tommy's ability to deliver high-quality work efficiently, leveraging his deep knowledge in front-end technologies and content management systems. Through this project, Tommy demonstrated not just his technical prowess but also his capacity to lead and innovate in a rapidly evolving digital landscape."
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
    title: "Digital Customer Portal v2",
    clientName: "Hansa Borg Bryggerier AS",
    slug: "hansa-borg-bryggerier-as-digital-customer-portal-v2",
    description: [
      "Hansa Borg Bryggerier AS, a prominent Norwegian brewery, faced challenges in their nightlife customer ordering process. To streamline and modernize this system, they collaborated with Knowit to create an innovative digital portal. This portal was aimed at enabling nightlife customers to place orders efficiently, eliminating the dependency on sales representatives.",
      "The Digital Customer Portal v2 was envisioned as a comprehensive solution to revamp Hansa Borg's customer interaction. Built on a microservice architecture, the project was a collaborative effort between Knowit and Hansa Borg's internal teams. The platform was hosted on Azure WebApps, leveraging Azure B2C for authentication and Azure Search Service for enhanced search capabilities. Most of the backend services were developed using Microsoft .NET, while the frontend was a sophisticated React application.",
      "Tommy, leading the development as the sole front-end developer, worked in tandem with a UX designer from Knowit Experience Bergen AS, a fellow developer focusing on internal microservices at Hansa Borg, and a product owner from Hansa Borg. This small but agile team employed Scrum methodologies, ensuring a dynamic and responsive development process.",
      "Tommy's responsibilities as the tech lead and senior front-end specialist involved a comprehensive overhaul of the existing codebase. He transitioned the platform from a Redux-driven Create React App (CRA) with SASS to a more efficient Single Page Application (SPA) using Vite, React Query, and Tailwind CSS. His strategic approach included the unification of existing UI components into a refined and reusable component library, ensuring a consistent and cohesive user experience across the portal.",
      "Furthermore, Tommy played a crucial role in migrating and enhancing the existing microservices from .NET Framework to .NET Core (now .NET 6). He was instrumental in establishing automated build and deployment pipelines, both for the microservices and the React application. His collaboration with the UX designer was pivotal in transitioning every page from the first version to the second, incorporating a completely new visual identity. This project not only showcased Tommy's technical expertise but also his ability to lead and innovate in a complex digital landscape."
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
    title: "kxb.app",
    clientName: "Knowit Experience Bergen AS",
    slug: "knowit-experience-bergen-as-kxb-app",
    description: ["Coming..."],
    summary:
      "Internal project for Knowit Experience Bergen AS. Estimating commission salary. Built with React, React Server Components, Server Actions, Next.js, Tailwind CSS, Vercel, Resend, PlanetScale, and MySQL.",
    startDate: "2020-05",
    endDate: "2023-12",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Vercel",
      "Resend",
      "PlanetScale",
      "MySQL",
      "React Server Components"
    ],
    images: [
      {
        src: "/images/cv/projects/kxb-app-1.webp",
        alt: "Knowit Experience Bergen AS — kxb.app",
        bannerObjectPosition: "top"
      },
      {
        src: "/images/cv/projects/kxb-app-2.webp",
        alt: "Knowit Experience Bergen AS — kxb.app"
      },
      {
        src: "/images/cv/projects/kxb-app-3.webp",
        alt: "Knowit Experience Bergen AS — kxb.app"
      },
      {
        src: "/images/cv/projects/kxb-app-4.webp",
        alt: "Knowit Experience Bergen AS — kxb.app"
      },
      {
        src: "/images/cv/projects/kxb-app-5.webp",
        alt: "Knowit Experience Bergen AS — kxb.app"
      },
      {
        src: "/images/cv/projects/kxb-app-6.webp",
        alt: "Knowit Experience Bergen AS — kxb.app"
      }
    ],
    roles: [
      {
        title: "Lead",
        description: ""
      }
    ]
  },
  {
    id: 7,
    title: "Onboarding wizard",
    clientName: "Hansa Borg Bryggerier AS",
    slug: "hansa-borg-bryggerier-as-onboarding-wizard",
    description: [
      "Hansa Borg Bryggerier AS, a leading Norwegian brewery, sought innovative digital solutions to streamline expanding their customer base. Their objective was to enhance lead management and sales follow-up efficiency through seamless integration with Microsoft Dynamics.",
      "In response, a state-of-the-art Onboarding Wizard was conceptualized to complement the existing Digital Customer Portal. This wizard aimed to automate and simplify the customer onboarding process, thereby significantly reducing manual efforts and improving lead handling.",
      "Tommy, in his capacity as the sole developer, collaborated closely with a product owner from Hansa Borg Bryggerier AS and a UX designer from Knowit Experience Bergen AS. This compact, yet effective team dynamic fostered a focused and agile approach to the project, aligning closely with Scrum methodologies.",
      "As the project's senior frontend specialist, Tommy was pivotal in architecting and implementing the Onboarding Wizard. Utilizing a robust stack of React, React Hook Form, TypeScript, and Tailwind CSS, he crafted a user-friendly interface that seamlessly integrated with the Digital Customer Portal. His technical acumen shone through in the wizard's capability to auto-fill forms using data from Brønnøysundregistrene and GLN ((Global Location Number), significantly enhancing user experience. Hosted on Azure WebApps, the wizard also featured backend integration with an Azure web app microservice, harmoniously syncing with Microsoft Dynamics. Tommy's strategic use of these technologies not only streamlined the onboarding process but also positioned the Digital Customer Portal at the forefront of customer engagement and digital innovation.",
      "Through Tommy's efforts, the Onboarding Wizard has become a important piece of Hansa Borg Bryggerier AS's digital strategy, setting new standards in customer management and operational efficiency. His expertise in frontend development and understanding of complex integrations have significantly contributed to the project's success, laying a solid foundation for future digital endeavors."
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
    id: 8,
    title: "Beer as a Service",
    clientName: "Hansa Borg Bryggerier AS",
    slug: "hansa-borg-bryggerier-as-beer-as-a-service",
    description: [
      "Hansa Borg Bryggerier AS, Norway's largest Norwegian-owned brewery and beverage company, employs around 300 individuals. In a market characterized by intense competition and price pressures, the company has been pivoting towards service differentiation and automation, signaling a significant shift from traditional product-focused strategies.",
      "Recognizing the need for innovative solutions to enhance profitability in the nightlife segment and strengthen customer connections, Hansa Borg Bryggerier AS partnered with Knowit in fall 2020. The objective was to develop a web application that not only addressed the current market challenges but also positioned the company at the forefront of digital transformation within the industry.",
      "Tommy, as a senior consultant and tech lead, worked collaboratively with two in-house developers from Hansa Borg. This synergistic team, under his guidance, combined their expertise to bring a visionary project to life, despite the complexities and evolving requirements.",
      "With a deep-seated understanding of modern web technologies and a forward-thinking approach, Tommy led the development of the web application, utilizing React, Next.js, TypeScript, and Tailwind CSS. His role transcended mere development; he was pivotal in conceptualizing and creating a React component library, ensuring a consistent and sophisticated user interface. This library, built with Radix UI and Visx, not only facilitated accessibility but also allowed for the effective representation of intricate statistics. Tommy's innovative use of Azure and Azure DevOps ensured a scalable and modern application, equipped with PWA capabilities. His expertise was further demonstrated in the integration of IoT microservices, allowing real-time data visualization from IoT devices via a REST API. This included critical parameters like tank pressure and temperature, enhancing operational efficiency and user experience.",
      "Though the project was eventually put on hold in 2023 due to Hansa Borg's acquisition by Royal Unibrew AS, Tommy's contributions laid the groundwork for a significant digital leap. The application's design and functionalities reflected a blend of technical acumen and visionary foresight, setting a benchmark for future digital initiatives within the company.",
      "Throughout the project, Tommy worked diligently to select technologies and tools that supported the project's objectives. His use of React, Azure, and the integration of IoT microservices reflected a sound understanding of how technical solutions can meet business needs."
    ],
    summary:
      "Hansa Borg Bryggerier AS saw a need to innovate to increase profitability in the nightlife segment and to better connect with customers to better meet the changes the industry faces. Utilizing the latest and greatest technologies Tommy created a modern and scalable web application with PWA capabilities to expose a data driven nightlife experience.",
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
          "Technical consulting before, during, and after delivery. Coordinating with the client and other vendors. Discussing and planning the architecture of the web application and microservices."
      },
      {
        title: "Senior Front-end Specialist",
        description:
          "Development of the web application in Next.js. Development of component libraries, web app in React, and integration with IoT microservices."
      }
    ]
  }
];

export { projectExperienceData };

export type { ProjectExperienceItem };
