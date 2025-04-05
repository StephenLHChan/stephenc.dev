import type { Metadata } from 'next'

import Paragraph from '@/components/paragraph'
import { Breadcrumb, Tag, ProjectImage } from '@/components/project-item'

export const metadata: Metadata = {
  title: 'Crypto Dashboard | Projects - Stephen LH Chan',
  description:
    'A real-time cryptocurrency analysis dashboard built with Python, pandas, and Dash',
  openGraph: {
    title: 'Crypto Dashboard | Projects - Stephen LH Chan',
    description:
      'A real-time cryptocurrency analysis dashboard built with Python, pandas, and Dash'
  }
}

const CryptoDashboard = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Breadcrumb>
        Crypto Dashboard{' '}
        <span className="ml-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 px-3 py-1 rounded-full text-sm font-medium">
          2022 - Present
        </span>
      </Breadcrumb>

      <ProjectImage
        src="/images/projects/thumbnail_crypto.png"
        alt="Crypto Dashboard"
        className="rounded-lg shadow-lg my-6 dark:shadow-gray-800"
      />

      <div className="prose dark:prose-invert max-w-none mb-8">
        <Paragraph>
          A real-time cryptocurrency analysis dashboard that provides
          comprehensive market data, price trends, and analytical tools for
          crypto traders and enthusiasts. Built with Python and Dash framework
          for interactive visualizations.
        </Paragraph>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <Tag>Website</Tag>
            <a
              href="https://stephen-c-crypto-dashboard.herokuapp.com"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 hover:underline ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              stephen-c-crypto-dashboard.herokuapp.com
            </a>
          </li>
          <li className="flex items-start">
            <Tag>Tech Stack</Tag>
            <span className="ml-2 flex flex-wrap gap-2">
              {['Python', 'pandas', 'Dash', 'Plotly'].map(tech => (
                <span
                  key={tech}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </span>
          </li>
          <li className="flex items-start">
            <Tag>Source Code</Tag>
            <a
              href="https://github.com/StephenLHChan/crypto-dashboard"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 hover:underline ml-2 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              View on GitHub
            </a>
          </li>
        </ul>
      </div>

      <div className="grid gap-6">
        <ProjectImage
          src="/images/projects/crypto-dashboard_001.png"
          alt="Crypto Dashboard Main View"
          className="rounded-lg shadow-lg dark:shadow-gray-800"
        />
        <ProjectImage
          src="/images/projects/crypto-dashboard_002.png"
          alt="Crypto Dashboard Analytics"
          className="rounded-lg shadow-lg dark:shadow-gray-800"
        />
      </div>
    </div>
  )
}

export default CryptoDashboard
