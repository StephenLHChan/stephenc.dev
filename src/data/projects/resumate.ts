import { Project } from './types'

import thumbResumate from '/public/images/projects/resumate/logo.png'

export const resumateProject: Project = {
  id: 'resumate',
  title: 'ResuMate',
  shortDescription: 'AI-powered resume builder and career assistant',
  description:
    'ResuMate is an AI-powered platform that helps job seekers create professional resumes, optimize their job search, and improve their career prospects.',
  yearFrom: '2025',
  thumbnail: thumbResumate,
  github: 'https://github.com/StephenLHChan/resumate',
  technologies: [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'OpenAI API'
  ],
  features: [
    'AI-powered resume builder with smart suggestions',
    'Real-time content optimization',
    'ATS-friendly resume templates',
    'Career path recommendations',
    'Job market insights'
  ]
}
