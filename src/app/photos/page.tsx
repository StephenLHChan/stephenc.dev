import PhotoGalleryContainer from '@/components/photo-gallery-container'
import SubfolderNavigation from '@/components/subfolder-navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photos - Stephen LH Chan',
  description: 'A collection of my favorite moments and memories.'
}

export default function PhotosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        A collection of my favorite moments and memories.
      </p>

      {/* Subfolder Navigation */}
      <SubfolderNavigation className="mb-12" />

      {/* Main Photo Gallery */}
      <PhotoGalleryContainer shuffle />
    </div>
  )
}
