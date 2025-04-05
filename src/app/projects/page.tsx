import type { Metadata } from 'next'

import Section from '@/components/section'
import { ProjectItem } from '@/components/project/project-item'
import { resumateProject } from '@/data/projects/resumate'

import thumbPriceChecker from '/public/images/projects/thumbnail_pricechecker.png'
import { cryptoDashboard } from '@/data/projects/crypto-dashboard'

export const metadata: Metadata = {
  title: 'Projects - Stephen LH Chan',
  openGraph: {
    title: 'Projects - Stephen LH Chan'
  }
}

const ProjectPage = () => {
  return (
    <div className="container mx-auto px-4">
      <Section delay={0.2}>
        <div className="mt-6 space-y-8">
          <ProjectItem
            id={resumateProject.id}
            title={resumateProject.title}
            description={resumateProject.shortDescription}
            thumbnail={resumateProject.thumbnail}
            tags={resumateProject.technologies}
            year={resumateProject.yearFrom}
          />
          <ProjectItem
            id={cryptoDashboard.id}
            title={cryptoDashboard.title}
            description={cryptoDashboard.shortDescription}
            thumbnail={cryptoDashboard.thumbnail}
            year={cryptoDashboard.yearFrom}
            tags={cryptoDashboard.technologies}
          />
          <ProjectItem
            id="#"
            title="Price Checker"
            description="A web app to check the price of grocery"
            thumbnail={thumbPriceChecker}
            year="2023"
            tags={['React', 'TypeScript', 'Next.js']}
          />
        </div>
      </Section>
    </div>
  )
}

export default ProjectPage
