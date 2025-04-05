import { Project } from './types'

import thumbCrypto from '/public/images/projects/thumbnail_crypto.png'
import thumbCrypto001 from '/public/images/projects/crypto-dashboard_001.png'
import thumbCrypto002 from '/public/images/projects/crypto-dashboard_002.png'

export const cryptoDashboard: Project = {
  id: 'crypto-dashboard',
  title: 'Crypto Dashboard',
  shortDescription:
    'A dashboard to display real-time data and graph of cryptocurrency',
  description:
    'A real-time cryptocurrency analysis dashboard that provides comprehensive market data, price trends, and analytical tools for crypto traders and enthusiasts. Built with Python and Dash framework for interactive visualizations.',
  yearFrom: '2022',
  yearTo: '2023',
  thumbnail: thumbCrypto,
  website: 'https://stephen-c-crypto-dashboard.herokuapp.com',
  github: 'https://github.com/StephenLHChan/crypto-dashboard',
  technologies: ['Python', 'pandas', 'Dash', 'Plotly'],
  additionalImages: [
    {
      src: thumbCrypto001,
      alt: 'Crypto Dashboard Main View'
    },
    {
      src: thumbCrypto002,
      alt: 'Crypto Dashboard Analytics'
    }
  ]
}
