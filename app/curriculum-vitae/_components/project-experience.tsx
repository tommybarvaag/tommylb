import { type ProjectExperienceItem } from "../_data/project-experience-data";

function ProjectExperience({ projectExperience }: { projectExperience: ProjectExperienceItem }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold">{projectExperience.title}</h3>
      <p className="text-sm text-gray-600">
        {projectExperience.startDate} — {projectExperience.endDate}
      </p>
      <h4 className="text-lg font-semibold">Description</h4>
      <p className="text-sm text-gray-600">{projectExperience.description}</p>
      <h4 className="text-lg font-semibold">Roles</h4>
      <ul className="list-inside list-disc">
        {projectExperience.roles.map((role, index) => (
          <li key={index}>
            <div>{role.title}</div>
            <div className="text-sm text-gray-600">{role.description}</div>
          </li>
        ))}
      </ul>
      <h4 className="text-lg font-semibold">Responsibilities</h4>
      <ul className="list-inside list-disc">
        {projectExperience.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
}

export { ProjectExperience };
