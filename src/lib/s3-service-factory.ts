import { S3PhotoService } from './s3-photo-service'
import { isS3Enabled } from './s3-config'
import { S3PhotoService as IS3PhotoService } from '@/types/s3'

export function createS3PhotoService(): IS3PhotoService | null {
  try {
    if (!isS3Enabled()) {
      console.warn(
        'S3 is not properly configured. Check your environment variables.'
      )
      return null
    }

    return new S3PhotoService()
  } catch (error) {
    console.error('Failed to create S3 photo service:', error)
    return null
  }
}

export function createS3PhotoServiceOrThrow(): IS3PhotoService {
  const service = createS3PhotoService()
  if (!service) {
    throw new Error(
      'S3 photo service is not available. Please check your configuration.'
    )
  }
  return service
}
