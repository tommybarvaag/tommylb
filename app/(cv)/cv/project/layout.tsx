import "@/app/global.css";
import { ProjectExperiences } from "@/components/project-experiences";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in duration-500">
      <ProjectExperiences />
      {children}
    </div>
  );
}
