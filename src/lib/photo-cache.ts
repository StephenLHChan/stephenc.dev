import { createS3PhotoService } from './s3-service-factory'
import { isS3Enabled, isFallbackEnabled } from './s3-config'
import { analyzeError, getErrorMessage, logError } from './error-handler'
import {
  performanceOptimizer,
  EnhancedPhotoCache
} from './performance-optimizer'
import { Photo, PhotosAPIResponse, SubfoldersAPIResponse } from '@/types/s3'

// Hardcoded fallback photos (from current implementation)
const FALLBACK_PHOTOS: Photo[] = [
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
    alt: 'Photo 7',
    caption: 'I guess... no one likes COVID'
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
    alt: 'Photo 12',
    caption: 'the WOREST day in the most beautiful town in the world 😅'
  },
  {
    src: '/images/photos/photo13.jpeg',
    alt: 'Photo 13'
  }
]

// Enhanced cache with performance optimizations
const enhancedCache = new EnhancedPhotoCache({
  maxAge: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: 10 * 60 * 1000, // 10 minutes
  maxSize: 50 * 1024 * 1024, // 50MB
  enableCompression: true
})

// Legacy cache for backward compatibility
let photoCache: PhotosAPIResponse | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export async function getPhotos(): Promise<PhotosAPIResponse> {
  const startTime = Date.now()

  // Check enhanced cache first
  const cacheKey = 'photos'
  const cachedResult = enhancedCache.get(cacheKey)
  if (cachedResult) {
    performanceOptimizer.recordLoadTime(Date.now() - startTime)
    performanceOptimizer.recordPhotoCount(cachedResult.photos.length)
    return cachedResult
  }

  // Fallback to legacy cache
  const now = Date.now()
  if (photoCache && now - cacheTimestamp < CACHE_DURATION) {
    performanceOptimizer.recordLoadTime(Date.now() - startTime)
    performanceOptimizer.recordPhotoCount(photoCache.photos.length)
    return {
      ...photoCache,
      cached: true
    }
  }

  try {
    // Check if S3 is enabled and available
    if (!isS3Enabled()) {
      console.warn('S3 is not configured, using fallback photos')
      const response = {
        photos: isFallbackEnabled() ? FALLBACK_PHOTOS : [],
        error: 'S3 not configured',
        cached: false
      }

      // Cache the fallback response
      photoCache = response
      cacheTimestamp = now

      return response
    }

    // Create S3 service
    const s3Service = createS3PhotoService()
    if (!s3Service) {
      console.error('Failed to create S3 service')
      const response = {
        photos: isFallbackEnabled() ? FALLBACK_PHOTOS : [],
        error: 'S3 service unavailable',
        cached: false
      }

      // Cache the error response
      photoCache = response
      cacheTimestamp = now

      return response
    }

    // Fetch photos from S3
    const photos = await s3Service.listPhotos()

    if (photos.length === 0) {
      console.warn('No photos found in S3, using fallback')
      const response = {
        photos: isFallbackEnabled() ? FALLBACK_PHOTOS : [],
        error: 'No photos found in S3',
        cached: false
      }

      // Cache the fallback response
      photoCache = response
      cacheTimestamp = now

      return response
    }

    // Optimize photos for performance
    const optimizedPhotos = performanceOptimizer.optimizePhotos(photos)

    const response = {
      photos: optimizedPhotos,
      cached: false
    }

    // Cache the successful response in both caches
    enhancedCache.set(cacheKey, response)
    photoCache = response
    cacheTimestamp = now

    // Record performance metrics
    performanceOptimizer.recordLoadTime(Date.now() - startTime)
    performanceOptimizer.recordPhotoCount(photos.length)

    return response
  } catch (error) {
    const errorDetails = analyzeError(error, { operation: 'getPhotos' })
    logError(errorDetails)

    const errorMessage = getErrorMessage(errorDetails)

    // Return fallback photos if enabled and available
    if (isFallbackEnabled() && errorDetails.fallbackAvailable) {
      const response = {
        photos: FALLBACK_PHOTOS,
        error: errorMessage,
        cached: false
      }

      // Cache the fallback response
      photoCache = response
      cacheTimestamp = now

      return response
    }

    // Return empty array if fallback is disabled or not available
    const response = {
      photos: [],
      error: errorMessage,
      cached: false
    }

    // Cache the error response
    photoCache = response
    cacheTimestamp = now

    return response
  }
}

export function clearPhotoCache(): void {
  photoCache = null
  cacheTimestamp = 0
}

export function getCacheStatus(): { cached: boolean; age: number } {
  const now = Date.now()
  return {
    cached: photoCache !== null && now - cacheTimestamp < CACHE_DURATION,
    age: photoCache ? now - cacheTimestamp : 0
  }
}

export function getPerformanceMetrics() {
  return performanceOptimizer.calculateMetrics()
}

export function getCacheStats() {
  return enhancedCache.getStats()
}

// Subfolder cache
let subfolderCache: SubfoldersAPIResponse | null = null
let subfolderCacheTimestamp: number = 0

export async function getSubfolders(): Promise<SubfoldersAPIResponse> {
  const startTime = Date.now()

  // Skip enhanced cache for subfolders (different type)
  // Go directly to legacy cache

  // Fallback to legacy cache
  const now = Date.now()
  if (subfolderCache && now - subfolderCacheTimestamp < CACHE_DURATION) {
    performanceOptimizer.recordLoadTime(Date.now() - startTime)
    return {
      ...subfolderCache,
      cached: true
    }
  }

  try {
    // Check if S3 is enabled and available
    if (!isS3Enabled()) {
      console.warn('S3 is not configured, returning empty subfolders')
      const response = {
        subfolders: [],
        error: 'S3 not configured',
        cached: false
      }

      // Cache the response
      subfolderCache = response
      subfolderCacheTimestamp = now

      return response
    }

    // Create S3 service
    const s3Service = createS3PhotoService()
    if (!s3Service) {
      console.error('Failed to create S3 service')
      const response = {
        subfolders: [],
        error: 'S3 service unavailable',
        cached: false
      }

      // Cache the error response
      subfolderCache = response
      subfolderCacheTimestamp = now

      return response
    }

    // Fetch subfolders from S3
    const subfolders = await s3Service.listSubfolders()

    const response = {
      subfolders,
      cached: false
    }

    // Cache the successful response in legacy cache only
    // (enhanced cache is typed for PhotosAPIResponse)
    subfolderCache = response
    subfolderCacheTimestamp = now

    // Record performance metrics
    performanceOptimizer.recordLoadTime(Date.now() - startTime)

    return response
  } catch (error) {
    const errorDetails = analyzeError(error, { operation: 'getSubfolders' })
    logError(errorDetails)

    const errorMessage = getErrorMessage(errorDetails)

    // Return empty subfolders on error
    const response = {
      subfolders: [],
      error: errorMessage,
      cached: false
    }

    // Cache the error response
    subfolderCache = response
    subfolderCacheTimestamp = now

    return response
  }
}

export function clearSubfolderCache(): void {
  subfolderCache = null
  subfolderCacheTimestamp = 0
}

export function clearAllCaches(): void {
  enhancedCache.clear()
  clearPhotoCache()
  clearSubfolderCache()
  performanceOptimizer.resetMetrics()
}
