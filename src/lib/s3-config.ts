import { S3Config } from '@/types/s3'

export function getS3Config(): S3Config {
  const requiredEnvVars = {
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }

  // Check for missing required environment variables
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    )
  }

  return {
    bucketName: requiredEnvVars.bucketName!,
    region: requiredEnvVars.region!,
    accessKeyId: requiredEnvVars.accessKeyId!,
    secretAccessKey: requiredEnvVars.secretAccessKey!,
    signedUrlExpiry: parseInt(
      process.env.AWS_S3_SIGNED_URL_EXPIRY || '3600',
      10
    )
  }
}

export function isS3Enabled(): boolean {
  try {
    getS3Config()
    return true
  } catch {
    return false
  }
}

export function isFallbackEnabled(): boolean {
  return process.env.AWS_S3_FALLBACK_ENABLED === 'true'
}
