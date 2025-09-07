import { Photo, PhotosAPIResponse } from '@/types/s3'

export interface PerformanceMetrics {
  loadTime: number
  cacheHitRate: number
  errorRate: number
  photoCount: number
  averagePhotoSize?: number
}

export interface CacheConfig {
  maxAge: number
  staleWhileRevalidate: number
  maxSize: number
  enableCompression: boolean
}

const DEFAULT_CACHE_CONFIG: CacheConfig = {
  maxAge: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: 10 * 60 * 1000, // 10 minutes
  maxSize: 50 * 1024 * 1024, // 50MB
  enableCompression: true
}

class PerformanceOptimizer {
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    cacheHitRate: 0,
    errorRate: 0,
    photoCount: 0
  }

  private cacheHits = 0
  private totalRequests = 0
  private errors = 0
  private config: CacheConfig

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CACHE_CONFIG, ...config }
  }

  /**
   * Optimize photos for better performance
   */
  optimizePhotos(photos: Photo[]): Photo[] {
    return photos.map(photo => ({
      ...photo,
      // Add performance hints for Next.js Image component
      loading: 'lazy' as const,
      // Ensure proper sizing hints
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    }))
  }

  /**
   * Preload critical photos
   */
  preloadCriticalPhotos(photos: Photo[], count: number = 3): void {
    if (typeof window === 'undefined') return

    const criticalPhotos = photos.slice(0, count)

    criticalPhotos.forEach(photo => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = photo.src
      document.head.appendChild(link)
    })
  }

  /**
   * Generate responsive image sources
   */
  generateResponsiveSources(photo: Photo): Partial<Photo> {
    // For S3 photos, we could generate different sizes
    // For now, return the original photo
    return photo
  }

  /**
   * Calculate performance metrics
   */
  calculateMetrics(): PerformanceMetrics {
    this.metrics.cacheHitRate =
      this.totalRequests > 0 ? this.cacheHits / this.totalRequests : 0
    this.metrics.errorRate =
      this.totalRequests > 0 ? this.errors / this.totalRequests : 0

    return { ...this.metrics }
  }

  /**
   * Record cache hit
   */
  recordCacheHit(): void {
    this.cacheHits++
    this.totalRequests++
  }

  /**
   * Record cache miss
   */
  recordCacheMiss(): void {
    this.totalRequests++
  }

  /**
   * Record error
   */
  recordError(): void {
    this.errors++
    this.totalRequests++
  }

  /**
   * Record load time
   */
  recordLoadTime(loadTime: number): void {
    this.metrics.loadTime = loadTime
  }

  /**
   * Record photo count
   */
  recordPhotoCount(count: number): void {
    this.metrics.photoCount = count
  }

  /**
   * Get cache configuration
   */
  getCacheConfig(): CacheConfig {
    return { ...this.config }
  }

  /**
   * Update cache configuration
   */
  updateCacheConfig(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      loadTime: 0,
      cacheHitRate: 0,
      errorRate: 0,
      photoCount: 0
    }
    this.cacheHits = 0
    this.totalRequests = 0
    this.errors = 0
  }
}

// Singleton instance
export const performanceOptimizer = new PerformanceOptimizer()

/**
 * Enhanced cache with performance optimizations
 */
export class EnhancedPhotoCache {
  private cache = new Map<
    string,
    { data: PhotosAPIResponse; timestamp: number; hits: number }
  >()
  private config: CacheConfig
  private optimizer: PerformanceOptimizer

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CACHE_CONFIG, ...config }
    this.optimizer = new PerformanceOptimizer(config)
  }

  /**
   * Get cached data with performance tracking
   */
  get(key: string): PhotosAPIResponse | null {
    const cached = this.cache.get(key)
    if (!cached) {
      this.optimizer.recordCacheMiss()
      return null
    }

    const now = Date.now()
    const age = now - cached.timestamp

    // Check if cache is still valid
    if (age > this.config.maxAge) {
      this.cache.delete(key)
      this.optimizer.recordCacheMiss()
      return null
    }

    // Record cache hit
    cached.hits++
    this.optimizer.recordCacheHit()

    return {
      ...cached.data,
      cached: true
    }
  }

  /**
   * Set cached data with performance tracking
   */
  set(key: string, data: PhotosAPIResponse): void {
    // Check cache size limit
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest()
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0
    })
  }

  /**
   * Evict oldest cache entries
   */
  private evictOldest(): void {
    let oldestKey = ''
    let oldestTime = Date.now()

    this.cache.forEach((value, key) => {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp
        oldestKey = key
      }
    })

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; hitRate: number; metrics: PerformanceMetrics } {
    return {
      size: this.cache.size,
      hitRate: this.optimizer.calculateMetrics().cacheHitRate,
      metrics: this.optimizer.calculateMetrics()
    }
  }
}

/**
 * Image optimization utilities
 */
export class ImageOptimizer {
  /**
   * Generate optimized image URLs for different sizes
   */
  static generateOptimizedUrls(
    baseUrl: string,
    _sizes: number[] = [400, 800, 1200]
  ): string[] {
    // For S3, we could use CloudFront or Lambda@Edge for resizing
    // For now, return the original URL
    return [baseUrl]
  }

  /**
   * Calculate optimal image dimensions
   */
  static calculateOptimalDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number = 1200,
    maxHeight: number = 1200
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight

    if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
      return { width: originalWidth, height: originalHeight }
    }

    if (aspectRatio > 1) {
      // Landscape
      return {
        width: maxWidth,
        height: Math.round(maxWidth / aspectRatio)
      }
    } else {
      // Portrait
      return {
        width: Math.round(maxHeight * aspectRatio),
        height: maxHeight
      }
    }
  }

  /**
   * Generate WebP format URLs if supported
   */
  static generateWebPUrl(originalUrl: string): string {
    // For S3, we could use Lambda@Edge to convert to WebP
    // For now, return the original URL
    return originalUrl
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetrics[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  /**
   * Record performance metrics
   */
  recordMetrics(metrics: PerformanceMetrics): void {
    this.metrics.push({
      ...metrics,
      // Add timestamp
      loadTime: metrics.loadTime,
      cacheHitRate: metrics.cacheHitRate,
      errorRate: metrics.errorRate,
      photoCount: metrics.photoCount,
      averagePhotoSize: metrics.averagePhotoSize
    })

    // Keep only last 100 measurements
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100)
    }
  }

  /**
   * Get average performance metrics
   */
  getAverageMetrics(): PerformanceMetrics {
    if (this.metrics.length === 0) {
      return {
        loadTime: 0,
        cacheHitRate: 0,
        errorRate: 0,
        photoCount: 0
      }
    }

    const sum = this.metrics.reduce((acc, metric) => ({
      loadTime: acc.loadTime + metric.loadTime,
      cacheHitRate: acc.cacheHitRate + metric.cacheHitRate,
      errorRate: acc.errorRate + metric.errorRate,
      photoCount: acc.photoCount + metric.photoCount,
      averagePhotoSize:
        (acc.averagePhotoSize || 0) + (metric.averagePhotoSize || 0)
    }))

    const count = this.metrics.length

    return {
      loadTime: sum.loadTime / count,
      cacheHitRate: sum.cacheHitRate / count,
      errorRate: sum.errorRate / count,
      photoCount: Math.round(sum.photoCount / count),
      averagePhotoSize: sum.averagePhotoSize
        ? sum.averagePhotoSize / count
        : undefined
    }
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = []
  }
}
