import { ProjectExperiences } from "@/components/project-experiences";
import "styles/global.css";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="duration-500 animate-in">
      <ProjectExperiences />
      {children}
    </div>
  );
}
