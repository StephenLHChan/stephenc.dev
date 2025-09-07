'use client'

import { useState, useEffect } from 'react'
import PhotoGallery from './photo-gallery'
import { performanceOptimizer } from '@/lib/performance-optimizer'
import { Photo, PhotosAPIResponse } from '@/types/s3'

interface PhotoGalleryContainerProps {
  shuffle?: boolean
}

export default function PhotoGalleryContainer({
  shuffle
}: PhotoGalleryContainerProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cached, setCached] = useState(false)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/photos')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: PhotosAPIResponse = await response.json()

        if (data.error) {
          console.warn('Photos API returned error:', data.error)
        }

        // Preload critical photos for better performance
        if (data.photos.length > 0) {
          performanceOptimizer.preloadCriticalPhotos(data.photos, 3)
        }

        setPhotos(data.photos)
        setCached(data.cached || false)
      } catch (err) {
        console.error('Error fetching photos:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch photos')
        setPhotos([]) // Show empty state on error
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600" />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Loading photos...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <div className="text-red-500 dark:text-red-400 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-lg font-medium">Unable to load photos</p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">No photos available</p>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for new photos.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PhotoGallery photos={photos} shuffle={shuffle} />
      {cached && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Photos loaded from cache
        </p>
      )}
    </div>
  )
}
