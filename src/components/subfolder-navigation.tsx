'use client'

import { useState, useEffect } from 'react'
import SubfolderCard from './subfolder-card'
import { Subfolder, SubfoldersAPIResponse } from '@/types/s3'

interface SubfolderNavigationProps {
  className?: string
}

const SubfolderNavigation = ({ className = '' }: SubfolderNavigationProps) => {
  const [subfolders, setSubfolders] = useState<Subfolder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubfolders = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/photos/subfolders')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: SubfoldersAPIResponse = await response.json()

        if (data.error) {
          console.warn('Subfolders API returned error:', data.error)
          // Don't treat API errors as fatal - just show empty state
          // This allows the main photo gallery to still work
        }

        setSubfolders(data.subfolders || [])
      } catch (err) {
        console.error('Error fetching subfolders:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to fetch subfolders'
        )
        setSubfolders([])
      } finally {
        setLoading(false)
      }
    }

    fetchSubfolders()
  }, [])

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Photo Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600" />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Loading photo collections...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Photo Collections
        </h2>
        <div className="text-center py-8">
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
            <p className="text-lg font-medium">
              Unable to load photo collections
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (subfolders.length === 0) {
    return null // Don't show anything if no subfolders exist
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Photo Collections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subfolders.map((subfolder, index) => (
          <SubfolderCard
            key={subfolder.name}
            subfolder={subfolder}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default SubfolderNavigation
