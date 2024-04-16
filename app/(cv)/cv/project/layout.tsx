import "@/app/global.css";
import { ProjectExperiences } from "@/components/project-experiences";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="duration-500 animate-in">
      <ProjectExperiences />
      {children}
    </div>
  );
}
