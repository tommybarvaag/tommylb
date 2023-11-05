import "styles/global.css";
import { ProjectExperiences } from "../../../../components/project-experiences";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in">
      <ProjectExperiences />
      {children}
    </div>
  );
}
