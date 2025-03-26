import type { Metadata } from 'next'

import Paragraph from '@/components/paragraph'
import { Breadcrumb, Tag, ProjectImage } from '@/components/project-item'

export const metadata: Metadata = {
  title: 'Projects - Stephen LH Chan',
  openGraph: {
    title: 'Projects - Stephen LH Chan'
  }
}

const CryptoDashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <Breadcrumb>
        Crypto Dashboard{' '}
        <span className="ml-2 bg-gray-200 text-gray-800 px-2 py-1 rounded">
          2022 -
        </span>
      </Breadcrumb>
      <ProjectImage
        src="/images/projects/thumbnail_crypto.png"
        alt="Crypto Dashboard"
      />
      <Paragraph>A real-time dashboard for analysis of crypto.</Paragraph>
      <ul className="list-none ml-4 my-4 space-y-4">
        <li className="flex items-start">
          <Tag>Website</Tag>
          <a
            href="https://stephen-c-crypto-dashboard.herokuapp.com"
            className="text-teal-500 hover:underline ml-2"
          >
            https://stephen-c-crypto-dashboard.herokuapp.com
          </a>
        </li>
        <li className="flex items-start">
          <Tag>Stacks</Tag>
          <span className="ml-2">Python, pandas, Dash</span>
        </li>
        <li className="flex items-start">
          <Tag>Source Code</Tag>
          <a
            href="https://github.com/StephenLHChan/crypto-dashboard"
            className="text-teal-500 hover:underline ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>

      <ProjectImage
        src="/images/projects/crypto-dashboard_001.png"
        alt="Crypto Dashboard"
      />
      <ProjectImage
        src="/images/projects/crypto-dashboard_002.png"
        alt="Crypto Dashboard"
      />
    </div>
  )
}

export default CryptoDashboard
