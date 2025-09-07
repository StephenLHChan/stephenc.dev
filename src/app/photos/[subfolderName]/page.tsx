import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PhotoGalleryContainer from '@/components/photo-gallery-container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface SubfolderPageProps {
  params: Promise<{ subfolderName: string }>
}

export async function generateMetadata({
  params
}: SubfolderPageProps): Promise<Metadata> {
  const { subfolderName } = await params
  const decodedName = decodeURIComponent(subfolderName)
  const displayName = decodedName.replace(/-/g, ' ').replace(/_/g, ' ')

  return {
    title: `${displayName} - Photos - Stephen LH Chan`,
    description: `A collection of photos from ${displayName}. Browse through curated photo collections organized by category.`,
    openGraph: {
      title: `${displayName} - Photos - Stephen LH Chan`,
      description: `A collection of photos from ${displayName}.`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} - Photos - Stephen LH Chan`,
      description: `A collection of photos from ${displayName}.`
    }
  }
}

export default async function SubfolderPage({ params }: SubfolderPageProps) {
  const { subfolderName } = await params
  const decodedName = decodeURIComponent(subfolderName)
  const displayName = decodedName.replace(/-/g, ' ').replace(/_/g, ' ')

  // Validate subfolder name
  if (!decodedName || decodedName.trim() === '') {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <Link
          href="/photos"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Photos
        </Link>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {displayName}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A collection of photos from {displayName}.
        </p>
      </div>

      {/* Photo Gallery */}
      <PhotoGalleryContainer subfolder={decodedName} />
    </div>
  )
}
