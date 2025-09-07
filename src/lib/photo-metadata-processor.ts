import { PhotoMetadata, S3ObjectMetadata } from '@/types/s3'

/**
 * Processes S3 object metadata into PhotoMetadata format
 */
export function processS3Metadata(
  s3Metadata: S3ObjectMetadata,
  key: string
): PhotoMetadata {
  return {
    alt: extractAltText(s3Metadata, key),
    caption: extractCaption(s3Metadata),
    aspectRatio: extractAspectRatio(s3Metadata)
  }
}

/**
 * Extracts alt text from S3 metadata with fallback
 */
export function extractAltText(
  metadata: S3ObjectMetadata,
  key: string
): string {
  const altText = metadata['x-amz-meta-alt']

  if (altText && altText.trim().length > 0) {
    return altText.trim()
  }

  return generateDefaultAltText(key)
}

/**
 * Extracts caption from S3 metadata
 */
export function extractCaption(metadata: S3ObjectMetadata): string | undefined {
  const caption = metadata['x-amz-meta-caption']

  if (caption && caption.trim().length > 0) {
    return caption.trim()
  }

  return undefined
}

/**
 * Extracts aspect ratio from S3 metadata
 */
export function extractAspectRatio(
  metadata: S3ObjectMetadata
): number | undefined {
  const aspectRatioStr = metadata['x-amz-meta-aspect-ratio']

  if (!aspectRatioStr) {
    return undefined
  }

  const aspectRatio = parseFloat(aspectRatioStr)

  // Validate aspect ratio is a positive number
  if (isNaN(aspectRatio) || aspectRatio <= 0) {
    console.warn(`Invalid aspect ratio in metadata: ${aspectRatioStr}`)
    return undefined
  }

  return aspectRatio
}

/**
 * Generates default alt text from S3 object key
 */
export function generateDefaultAltText(key: string): string {
  // Extract filename without extension and path
  const filename = key.split('/').pop() || key
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

  // Convert kebab-case or snake_case to readable text
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Validates PhotoMetadata object
 */
export function validatePhotoMetadata(metadata: PhotoMetadata): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Validate alt text
  if (!metadata.alt || metadata.alt.trim().length === 0) {
    errors.push('Alt text is required')
  } else if (metadata.alt.length > 200) {
    errors.push('Alt text is too long (max 200 characters)')
  }

  // Validate caption
  if (metadata.caption && metadata.caption.length > 500) {
    errors.push('Caption is too long (max 500 characters)')
  }

  // Validate aspect ratio
  if (metadata.aspectRatio !== undefined) {
    if (isNaN(metadata.aspectRatio) || metadata.aspectRatio <= 0) {
      errors.push('Aspect ratio must be a positive number')
    } else if (metadata.aspectRatio > 10) {
      errors.push('Aspect ratio seems too high (max 10)')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sanitizes metadata values to prevent XSS and other issues
 */
export function sanitizeMetadata(metadata: PhotoMetadata): PhotoMetadata {
  return {
    alt: sanitizeText(metadata.alt),
    caption: metadata.caption ? sanitizeText(metadata.caption) : undefined,
    aspectRatio: metadata.aspectRatio
  }
}

/**
 * Sanitizes text content
 */
function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 500) // Limit length
}

/**
 * Creates metadata for S3 object upload
 */
export function createS3Metadata(metadata: PhotoMetadata): S3ObjectMetadata {
  const s3Metadata: S3ObjectMetadata = {}

  if (metadata.alt) {
    s3Metadata['x-amz-meta-alt'] = metadata.alt
  }

  if (metadata.caption) {
    s3Metadata['x-amz-meta-caption'] = metadata.caption
  }

  if (metadata.aspectRatio) {
    s3Metadata['x-amz-meta-aspect-ratio'] = metadata.aspectRatio.toString()
  }

  return s3Metadata
}
