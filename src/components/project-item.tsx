'use client'

import NextLink from 'next/link'
import NextImage, { StaticImageData } from 'next/image'
import { ChevronRight } from 'lucide-react'

export const ProjectItem = ({
  id,
  title,
  description,
  thumbnail,
  tags = [],
  year
}: {
  id: string
  title: string
  description: string
  thumbnail: StaticImageData
  tags?: string[]
  year?: string
}) => {
  return (
    <div className="w-full mb-8">
      <NextLink href={`/projects/${id}`} passHref>
        <div className="group relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-all duration-300 bg-white dark:bg-gray-800">
          <div className="relative aspect-video overflow-hidden">
            <NextImage
              src={thumbnail}
              alt={title}
              width={1080}
              height={720}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {title}
              </h3>
              {year && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {year}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </NextLink>
    </div>
  )
}

export const Breadcrumb = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-2 mb-4">
    <NextLink href="/projects" passHref>
      <span className="text-teal-500 dark:text-teal-400 hover:underline">
        Projects
      </span>
    </NextLink>
    <span className="text-gray-500 dark:text-gray-400">
      <ChevronRight className="w-4 h-4" />
    </span>
    <h3 className="inline-block text-lg font-bold dark:text-gray-100">
      {children}
    </h3>
  </div>
)

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm font-medium px-2 py-1 rounded mr-2">
    {children}
  </span>
)

export const ProjectImage = ({
  src,
  alt,
  className = ''
}: {
  src: StaticImageData | string
  alt: string
  className?: string
}) => (
  <NextImage
    src={src}
    width={1080}
    height={720}
    alt={alt}
    className={`rounded-lg w-full mb-4 ${className}`}
    priority
  />
)
