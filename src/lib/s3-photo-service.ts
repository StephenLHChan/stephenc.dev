import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getS3Config } from './s3-config'
import {
  processS3Metadata,
  sanitizeMetadata,
  generateDefaultAltText
} from './photo-metadata-processor'
import {
  analyzeError,
  S3PhotoError,
  ErrorType,
  logError
} from './error-handler'
import {
  S3PhotoService as IS3PhotoService,
  Photo,
  PhotoMetadata,
  S3ObjectMetadata,
  Subfolder
} from '@/types/s3'

export class S3PhotoService implements IS3PhotoService {
  private s3Client: S3Client
  private config: ReturnType<typeof getS3Config>

  constructor() {
    this.config = getS3Config()
    this.s3Client = new S3Client({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      }
    })
  }

  async listPhotos(): Promise<Photo[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.config.bucketName,
        Prefix: 'photos/',
        MaxKeys: 1000 // Adjust based on expected photo count
      })

      const response = await this.s3Client.send(command)

      if (!response.Contents) {
        return []
      }

      // Filter for image files in the root photos directory (exclude subfolders)
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
      const photoPromises = response.Contents.filter(object => {
        if (!object.Key) return false

        // Exclude photos in subfolders - only include photos directly in photos/ directory
        const relativePath = object.Key.replace('photos/', '')
        if (relativePath.includes('/')) {
          return false // This photo is in a subfolder
        }

        const extension = object.Key.toLowerCase().substring(
          object.Key.lastIndexOf('.')
        )
        return imageExtensions.includes(extension)
      }).map(async object => {
        if (!object.Key) return null

        try {
          const metadata = await this.getPhotoMetadata(object.Key)
          const signedUrl = await this.generateSignedUrl(object.Key)

          return {
            src: signedUrl,
            alt: metadata.alt,
            caption: metadata.caption,
            aspectRatio: metadata.aspectRatio
          } as Photo
        } catch (error) {
          const errorDetails = analyzeError(error, { photoKey: object.Key })
          logError(errorDetails, { operation: 'processPhoto' })
          return null
        }
      })

      const photos = await Promise.all(photoPromises)
      return photos.filter((photo): photo is Photo => photo !== null)
    } catch (error) {
      const errorDetails = analyzeError(error, { operation: 'listPhotos' })
      logError(errorDetails)

      // Throw a more specific error based on the error type
      throw new S3PhotoError(
        errorDetails.type,
        errorDetails.message,
        errorDetails.retryable,
        errorDetails.fallbackAvailable,
        errorDetails.context
      )
    }
  }

  async getPhotoMetadata(key: string): Promise<PhotoMetadata> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.config.bucketName,
        Key: key
      })

      const response = await this.s3Client.send(command)
      const s3Metadata = response.Metadata as S3ObjectMetadata

      // Process metadata using the dedicated processor
      const metadata = processS3Metadata(s3Metadata, key)

      // Sanitize and return the metadata
      return sanitizeMetadata(metadata)
    } catch (error) {
      const errorDetails = analyzeError(error, {
        photoKey: key,
        operation: 'getPhotoMetadata'
      })
      logError(errorDetails)

      // Return default metadata for metadata errors
      return {
        alt: generateDefaultAltText(key),
        caption: undefined,
        aspectRatio: undefined
      }
    }
  }

  async generateSignedUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.config.bucketName,
        Key: key
      })

      return await getSignedUrl(this.s3Client, command, {
        expiresIn: this.config.signedUrlExpiry
      })
    } catch (error) {
      const errorDetails = analyzeError(error, {
        photoKey: key,
        operation: 'generateSignedUrl'
      })
      logError(errorDetails)

      throw new S3PhotoError(
        ErrorType.S3_SIGNED_URL_ERROR,
        `Failed to generate signed URL for ${key}`,
        errorDetails.retryable,
        false, // No fallback for signed URL errors
        errorDetails.context
      )
    }
  }

  async listSubfolders(): Promise<Subfolder[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.config.bucketName,
        Prefix: 'photos/',
        Delimiter: '/',
        MaxKeys: 1000
      })

      const response = await this.s3Client.send(command)

      if (!response.CommonPrefixes) {
        return []
      }

      const subfolderPromises = response.CommonPrefixes.map(async prefix => {
        if (!prefix.Prefix) return null

        const subfolderName = prefix.Prefix.replace('photos/', '').replace(
          '/',
          ''
        )
        const displayName = subfolderName.replace(/-/g, ' ').replace(/_/g, ' ')

        try {
          // Get photo count for this subfolder
          const photoCount = await this.getSubfolderPhotoCount(subfolderName)

          // Get cover image URL
          const coverImageUrl = await this.getSubfolderCoverImage(subfolderName)

          return {
            name: subfolderName,
            displayName: displayName,
            coverImageUrl: coverImageUrl || undefined,
            photoCount,
            path: `photos/${subfolderName}/`
          } as Subfolder
        } catch (error) {
          const errorDetails = analyzeError(error, { subfolderName })
          logError(errorDetails, { operation: 'processSubfolder' })
          return null
        }
      })

      const subfolders = await Promise.all(subfolderPromises)
      return subfolders.filter(
        (subfolder): subfolder is Subfolder => subfolder !== null
      )
    } catch (error) {
      const errorDetails = analyzeError(error, { operation: 'listSubfolders' })
      logError(errorDetails)

      throw new S3PhotoError(
        errorDetails.type,
        errorDetails.message,
        errorDetails.retryable,
        errorDetails.fallbackAvailable,
        errorDetails.context
      )
    }
  }

  async listPhotosInSubfolder(subfolderName: string): Promise<Photo[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.config.bucketName,
        Prefix: `photos/${subfolderName}/`,
        MaxKeys: 1000
      })

      const response = await this.s3Client.send(command)

      if (!response.Contents) {
        return []
      }

      // Filter for image files and process them
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
      const photoPromises = response.Contents.filter(object => {
        if (!object.Key) return false
        const extension = object.Key.toLowerCase().substring(
          object.Key.lastIndexOf('.')
        )
        return imageExtensions.includes(extension)
      }).map(async object => {
        if (!object.Key) return null

        try {
          const metadata = await this.getPhotoMetadata(object.Key)
          const signedUrl = await this.generateSignedUrl(object.Key)

          return {
            src: signedUrl,
            alt: metadata.alt,
            caption: metadata.caption,
            aspectRatio: metadata.aspectRatio
          } as Photo
        } catch (error) {
          const errorDetails = analyzeError(error, { photoKey: object.Key })
          logError(errorDetails, { operation: 'processSubfolderPhoto' })
          return null
        }
      })

      const photos = await Promise.all(photoPromises)
      return photos.filter((photo): photo is Photo => photo !== null)
    } catch (error) {
      const errorDetails = analyzeError(error, {
        operation: 'listPhotosInSubfolder',
        subfolderName
      })
      logError(errorDetails)

      throw new S3PhotoError(
        errorDetails.type,
        errorDetails.message,
        errorDetails.retryable,
        errorDetails.fallbackAvailable,
        errorDetails.context
      )
    }
  }

  async getSubfolderCoverImage(subfolderName: string): Promise<string | null> {
    try {
      // Standard cover image filenames to check
      const coverImageNames = [
        'cover.jpg',
        'cover.jpeg',
        'thumbnail.jpg',
        'thumbnail.jpeg'
      ]

      for (const coverName of coverImageNames) {
        const coverKey = `photos/${subfolderName}/${coverName}`

        try {
          // Check if the cover image exists
          const headCommand = new HeadObjectCommand({
            Bucket: this.config.bucketName,
            Key: coverKey
          })

          await this.s3Client.send(headCommand)

          // If it exists, generate a signed URL
          const signedUrl = await this.generateSignedUrl(coverKey)
          return signedUrl
        } catch (error) {
          // Continue to next cover image name if this one doesn't exist
          continue
        }
      }

      return null
    } catch (error) {
      const errorDetails = analyzeError(error, {
        operation: 'getSubfolderCoverImage',
        subfolderName
      })
      logError(errorDetails)
      return null
    }
  }

  private async getSubfolderPhotoCount(subfolderName: string): Promise<number> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.config.bucketName,
        Prefix: `photos/${subfolderName}/`,
        MaxKeys: 1000
      })

      const response = await this.s3Client.send(command)

      if (!response.Contents) {
        return 0
      }

      // Count only image files
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
      return response.Contents.filter(object => {
        if (!object.Key) return false
        const extension = object.Key.toLowerCase().substring(
          object.Key.lastIndexOf('.')
        )
        return imageExtensions.includes(extension)
      }).length
    } catch (error) {
      const errorDetails = analyzeError(error, {
        operation: 'getSubfolderPhotoCount',
        subfolderName
      })
      logError(errorDetails)
      return 0
    }
  }
}
