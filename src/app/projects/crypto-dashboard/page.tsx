import type { Metadata } from 'next'
import ProjectPageLayout from '@/components/project/project-page-layout'
import { cryptoDashboard } from '@/data/projects/crypto-dashboard'

export const metadata: Metadata = {
  title: 'Crypto Dashboard | Projects - Stephen LH Chan',
  description: cryptoDashboard.shortDescription,
  openGraph: {
    title: 'Crypto Dashboard | Projects - Stephen LH Chan',
    description: cryptoDashboard.shortDescription
  }
}

const CryptoDashboard = () => {
  return (
    <ProjectPageLayout
      title={cryptoDashboard.title}
      yearFrom={cryptoDashboard.yearFrom}
      yearTo={cryptoDashboard.yearTo}
      thumbnail={cryptoDashboard.thumbnail}
      description={cryptoDashboard.description}
      website={cryptoDashboard.website}
      github={cryptoDashboard.github}
      technologies={cryptoDashboard.technologies}
      features={cryptoDashboard.features}
      additionalImages={cryptoDashboard.additionalImages}
    />
  )
}

export default CryptoDashboard
