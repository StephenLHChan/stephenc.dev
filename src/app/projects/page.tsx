import type { Metadata } from 'next'

import Section from '@/components/section'
import SectionTitle from '@/components/section-title'
import { ProjectItem } from '@/components/project-item'

import thumbCrypto from '/public/images/projects/thumbnail_crypto.png'
import thumbPriceChecker from '/public/images/projects/thumbnail_pricechecker.png'

export const metadata: Metadata = {
  title: 'Projects - Stephen LH Chan',
  openGraph: {
    title: 'Projects - Stephen LH Chan'
  }
}

const ProjectPage = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionTitle>Projects</SectionTitle>
      <Section delay={0.2}>
        <div className="mt-6 space-y-8">
          <ProjectItem
            id="crypto-dashboard"
            title="Crypto Dashboard"
            description="A dashboard to display real-time data and graph of cryptocurrency"
            thumbnail={thumbCrypto}
            year="2022"
            tags={['Python', 'Pandas', 'Dash']}
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
