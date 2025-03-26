import NextLink from 'next/link'
import NextImage from 'next/image'
import { ChevronRight } from 'lucide-react'

export const ProjectItem = ({
  id,
  title,
  description,
  thumbnail
}: {
  id: string
  title: string
  description: string
  thumbnail
}) => {
  return (
    <div className="w-full text-center mb-6">
      <NextLink href={`/projects/${id}`} passHref>
        <div className="rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
          <NextImage
            src={thumbnail}
            alt={title}
            width={1080}
            height={720}
            className="object-cover w-full h-full"
            placeholder="blur"
          />
          <div className="p-4">
            <h3 className="mt-2 text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </NextLink>
    </div>
  )
}

export const Breadcrumb = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-2 mb-4">
    <NextLink href="/projects" passHref>
      <span className="text-teal-500 hover:underline">Projects</span>
    </NextLink>
    <span className="text-gray-500">
      <ChevronRight className="w-4 h-4" />
    </span>
    <h3 className="inline-block text-lg font-bold">{children}</h3>
  </div>
)

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded mr-2">
    {children}
  </span>
)

export const ProjectImage = ({ src, alt }: { src; alt: string }) => (
  <NextImage
    src={src}
    width={1080}
    height={720}
    alt={alt}
    className="rounded-lg w-full mb-4"
    // placeholder="blur"
  />
)
