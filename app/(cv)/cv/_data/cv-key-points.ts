type CvWorkPlace = "Digitroll AS" | "Knowit Experience Bergen AS";
type CvWorkPlaceTitle = "Senior Consultant" | "Developer";

type CvWorkExperience = {
  id: number;
  workPlace: CvWorkPlace;
  workPlaceTitle: CvWorkPlaceTitle;
  area: string;
  fromDate: string;
  // date string in format YYYY-MM-DD or now
  toDate: string | "now";
  description: string;
  summary: string;
};

type CvEducation = {
  id: number;
  title: string;
  area: string;
  fromDate: string;
  toDate: string;
  description: string;
};

type CvSkill = {
  id: number;
  title:
    | "JavaScript"
    | "TypeScript"
    | "C#"
    | "React"
    | "Next.js"
    | "Tailwind CSS"
    | "CSS"
    | "HTML"
    | "Git"
    | "AWS"
    | "SQL"
    | "NoSQL"
    | "MongoDB"
    | "Redis"
    | "Elasticsearch"
    | "GraphQL"
    | "REST"
    | "Microservices"
    | "CI/CD"
    | "English"
    | "Norwegian"
    | "ASP.NET Core"
    | "Azure"
    | "Azure DevOps"
    | "Sass"
    | "Microsoft SQL Server"
    | "Azure B2C";
  slug: string;
  description: string[];
};

type CvKeySkills = {
  title: string;
  skills: CvSkill[];
};

const cvWorkExperience: CvWorkExperience[] = [
  {
    id: 1,
    workPlace: "Digitroll AS",
    workPlaceTitle: "Developer",
    area: "Bergen, Norway",
    fromDate: "2014-01-01",
    toDate: "2017-01-01",
    description:
      "I primarily worked with development of e-commerce solutions with varying degrees of custom tailoring. In my time at Digitroll I worked with nopCommerce and Digitroll's self-developed Lynx to build the solutions we delivered.",
    summary:
      "I worked with development of e-commerce solutions with varying degrees of custom tailoring."
  },
  {
    id: 2,
    workPlace: "Knowit Experience Bergen AS",
    workPlaceTitle: "Developer",
    area: "Bergen, Norway",
    fromDate: "2017-02-01",
    toDate: "2020-01-01",
    description:
      "My work is within customized customer solutions covering CMS to complex integrations. In my time with Knowit I have taken part in large-scale customer projects involving traditional REST API’s, micro services and custom-tailored solutions written in react.js among others.",
    summary: "My work is within customized customer solutions covering CMS to complex integrations."
  },
  {
    id: 3,
    workPlace: "Knowit Experience Bergen AS",
    workPlaceTitle: "Senior Consultant",
    area: "Bergen, Norway",
    fromDate: "2020-02-01",
    toDate: new Date().toISOString().split("T")[0],
    description: "Senior consultant",
    summary: ""
  }
];

const cvEducation: CvEducation[] = [
  {
    id: 1,
    title: "Bachelor of Science (B.S.), Computer Engineering",
    area: "Bergen, Norway",
    fromDate: "2010-08-01",
    toDate: "2013-06-01",
    description: "Computer Engineering"
  }
];

const cvSkillTypeScript: CvSkill = {
  id: 1,
  title: "TypeScript",
  slug: "cv/skill/typescript",
  description: [
    "I'm fluent in TypeScript and have used it for many years. I excel at designing and implementing TypeScript solutions using modern TypeScript frameworks such as Next.js and React.",
    "I believe TypeScript provides a lot of value for teams to iterate faster and with more confidence. And if I get to choose, I will always choose TypeScript over JavaScript.",
    "Creating dense and scalable UI components is something I truly enjoy, and TypeScript is a great tool for this."
  ]
};

const cvSkillJavaScript: CvSkill = {
  id: 2,
  title: "JavaScript",
  slug: "cv/skill/javascript",
  description: [
    "I'm fluent in JavaScript and have used it for many years. I have experience with both vanilla JavaScript and libraries such as jQuery and React. I excel at designing and implementing JavaScript solutions using modern JavaScript frameworks such as Next.js and React.",
    "Nowadays I mostly use TypeScript, but I still enjoy working with JavaScript."
  ]
};

const cvSkillCSharp: CvSkill = {
  id: 3,
  title: "C#",
  slug: "cv/skill/csharp",
  description: [
    "I consider myself more of a frontend developer these days, but I have a solid background in C# and .NET. I have used C# and .NET for many years and have experience with both .NET Framework and .NET Core.",
    "My experience comes from building things such as locally hosted EPiServer CMS solutions to large-scale cloud-based microservice solutions.",
    "I still enjoy working with C# and .NET and I'm always looking for ways to improve my knowledge of it."
  ]
};

const cvSkillReact: CvSkill = {
  id: 4,
  title: "React",
  slug: "cv/skill/react",
  description: [
    "My relationship with React started in 2017 and I have been lucky enough to work with it ever since. I'm huge fan of React and I make sure to stay up to speed with the latest developments in the React ecosystem.",
    "Talking about the future, and specifically React Server Components, I'm very excited about the future of React."
  ]
};

const cvSkillNextJs: CvSkill = {
  id: 5,
  title: "Next.js",
  slug: "cv/skill/nextjs",
  description: [
    "I truly enjoy working with Next.js and have used it since version 8 that was released in 2018. With Next.js I can build modern, fast and scalable web applications. Passionate about building the best possible user experience."
  ]
};

const cvSkillTailwindCss: CvSkill = {
  id: 6,
  title: "Tailwind CSS",
  slug: "cv/skill/tailwindcss",
  description: [
    "I picked up Tailwind CSS in 2020 and have used it where it makes sense since then. I'm a big fan of Tailwind CSS and I'm always looking for ways to improve my knowledge of it. Tailwind CSS allows me to build fast and colocate UI components. This again allows me to build web solution with dense UI components that truly are scalable."
  ]
};

const cvKeySkills: CvKeySkills = {
  title: "Key Skills",
  skills: [
    { ...cvSkillTypeScript },
    { ...cvSkillJavaScript },
    { ...cvSkillCSharp },
    { ...cvSkillReact },
    { ...cvSkillNextJs },
    { ...cvSkillTailwindCss }
  ]
};

export {
  cvEducation,
  cvKeySkills,
  cvSkillCSharp,
  cvSkillJavaScript,
  cvSkillNextJs,
  cvSkillReact,
  cvSkillTailwindCss,
  cvSkillTypeScript,
  cvWorkExperience
};
export type { CvEducation, CvKeySkills, CvWorkExperience };
