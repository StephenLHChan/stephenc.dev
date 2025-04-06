import PhotoGallery from '@/components/photo-gallery'
import { Metadata } from 'next'

// Sample photos data - replace with your actual photos
const photos = [
  {
    src: '/images/photos/photo1.jpeg',
    alt: 'Photo 1'
  },
  {
    src: '/images/photos/photo2.jpeg',
    alt: 'Photo 2'
  },
  {
    src: '/images/photos/photo3.jpeg',
    alt: 'Photo 3'
  },
  {
    src: '/images/photos/photo4.jpeg',
    alt: 'Photo 4'
  },
  {
    src: '/images/photos/photo5.jpeg',
    alt: 'Photo 5'
  },
  {
    src: '/images/photos/photo6.jpeg',
    alt: 'Photo 6',
    caption: 'yes... my foot was hurt'
  },
  {
    src: '/images/photos/photo7.jpeg',
    alt: 'Photo 7'
  },
  {
    src: '/images/photos/photo8.jpeg',
    alt: 'Photo 8'
  },
  {
    src: '/images/photos/photo9.jpeg',
    alt: 'Photo 9'
  },
  {
    src: '/images/photos/photo10.jpeg',
    alt: 'Photo 10'
  },
  {
    src: '/images/photos/photo11.jpeg',
    alt: 'Photo 11'
  },
  {
    src: '/images/photos/photo12.jpeg',
    alt: 'Photo 12'
  },
  {
    src: '/images/photos/photo13.jpeg',
    alt: 'Photo 13'
  }
]

export const metadata: Metadata = {
  title: 'Photos',
  description: 'A collection of my favorite moments and memories.'
}

export default function PhotosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        A collection of my favorite moments and memories.
      </p>
      <PhotoGallery photos={photos} />
    </div>
  )
}
