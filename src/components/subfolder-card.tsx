'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Subfolder } from '@/types/s3'

interface SubfolderCardProps {
  subfolder: Subfolder
  index: number
}

const SubfolderCard = ({ subfolder, index }: SubfolderCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <Link
        href={`/photos/${encodeURIComponent(subfolder.name)}`}
        aria-label={`View photos in ${subfolder.displayName} collection (${subfolder.photoCount} photos)`}
      >
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
          {/* Cover Image or Placeholder */}
          {subfolder.coverImageUrl && !imageError ? (
            <Image
              src={subfolder.coverImageUrl}
              alt={`${subfolder.displayName} cover`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <div className="text-gray-500 dark:text-gray-400 text-4xl">
                📁
              </div>
            </div>
          )}

          {/* Loading State */}
          {!imageLoaded && subfolder.coverImageUrl && !imageError && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}

          {/* Overlay with subfolder info */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
            <h3 className="text-white text-lg font-semibold text-center mb-2">
              {subfolder.displayName}
            </h3>
            <p className="text-white/80 text-sm text-center">
              {subfolder.photoCount} photo
              {subfolder.photoCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Always visible subfolder name (for accessibility) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white text-sm font-medium truncate">
              {subfolder.displayName}
            </h3>
            <p className="text-white/80 text-xs">
              {subfolder.photoCount} photo
              {subfolder.photoCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default SubfolderCard
