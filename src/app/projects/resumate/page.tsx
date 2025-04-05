import { resumateProject } from '@/data/projects/resumate'
import ProjectPageLayout from '@/components/project/project-page-layout'

export default function ResuMatePage() {
  return (
    <ProjectPageLayout
      title={resumateProject.title}
      yearFrom={resumateProject.yearFrom}
      yearTo={resumateProject.yearTo}
      thumbnail={resumateProject.thumbnail}
      description={resumateProject.description}
      technologies={resumateProject.technologies}
      features={resumateProject.features}
      github={resumateProject.github}
    >
      {resumateProject.challenges && resumateProject.solutions && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Challenges & Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Challenges</h3>
              <ul className="list-disc pl-6">
                {resumateProject.challenges.map((challenge, index) => (
                  <li key={index} className="mb-2">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Solutions</h3>
              <ul className="list-disc pl-6">
                {resumateProject.solutions.map((solution, index) => (
                  <li key={index} className="mb-2">
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </ProjectPageLayout>
  )
}
