import { StaticImageData } from 'next/image'

export interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  yearFrom: string
  yearTo?: string
  thumbnail: StaticImageData
  website?: string
  github?: string
  technologies: string[]
  features?: string[]
  challenges?: string[]
  solutions?: string[]
  additionalImages?: {
    src: StaticImageData
    alt: string
  }[]
}
