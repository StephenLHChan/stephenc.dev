/* eslint-disable no-unused-vars */
export enum ErrorType {
  S3_CONNECTION_ERROR = 'S3_CONNECTION_ERROR',
  S3_PERMISSION_ERROR = 'S3_PERMISSION_ERROR',
  S3_NOT_FOUND_ERROR = 'S3_NOT_FOUND_ERROR',
  S3_METADATA_ERROR = 'S3_METADATA_ERROR',
  S3_SIGNED_URL_ERROR = 'S3_SIGNED_URL_ERROR',
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Export individual values to satisfy ESLint
export const {
  S3_CONNECTION_ERROR,
  S3_PERMISSION_ERROR,
  S3_NOT_FOUND_ERROR,
  S3_METADATA_ERROR,
  S3_SIGNED_URL_ERROR,
  API_ERROR,
  NETWORK_ERROR,
  CONFIGURATION_ERROR,
  UNKNOWN_ERROR
} = ErrorType

export interface ErrorDetails {
  type: ErrorType
  message: string
  originalError?: Error
  context?: Record<string, any>
  retryable: boolean
  fallbackAvailable: boolean
}

export class S3PhotoError extends Error {
  public readonly type: ErrorType
  public readonly retryable: boolean
  public readonly fallbackAvailable: boolean
  public readonly context?: Record<string, any>

  constructor(
    type: ErrorType,
    message: string,
    retryable: boolean = false,
    fallbackAvailable: boolean = true,
    context?: Record<string, any>
  ) {
    super(message)
    this.name = 'S3PhotoError'
    this.type = type
    this.retryable = retryable
    this.fallbackAvailable = fallbackAvailable
    this.context = context
  }
}

export function analyzeError(
  error: unknown,
  context?: Record<string, any>
): ErrorDetails {
  // Handle S3PhotoError instances
  if (error instanceof S3PhotoError) {
    return {
      type: error.type,
      message: error.message,
      originalError: error,
      context: { ...context, ...error.context },
      retryable: error.retryable,
      fallbackAvailable: error.fallbackAvailable
    }
  }

  // Handle AWS SDK errors
  if (error && typeof error === 'object' && 'name' in error) {
    const awsError = error as any

    switch (awsError.name) {
      case 'NoSuchBucket':
        return {
          type: ErrorType.S3_NOT_FOUND_ERROR,
          message: 'S3 bucket not found',
          originalError: error as Error,
          context,
          retryable: false,
          fallbackAvailable: true
        }

      case 'AccessDenied':
        return {
          type: ErrorType.S3_PERMISSION_ERROR,
          message: 'Access denied to S3 bucket',
          originalError: error as Error,
          context,
          retryable: false,
          fallbackAvailable: true
        }

      case 'InvalidAccessKeyId':
      case 'SignatureDoesNotMatch':
        return {
          type: ErrorType.S3_PERMISSION_ERROR,
          message: 'Invalid AWS credentials',
          originalError: error as Error,
          context,
          retryable: false,
          fallbackAvailable: true
        }

      case 'NetworkingError':
      case 'TimeoutError':
        return {
          type: ErrorType.S3_CONNECTION_ERROR,
          message: 'Network error connecting to S3',
          originalError: error as Error,
          context,
          retryable: true,
          fallbackAvailable: true
        }

      case 'ServiceUnavailable':
        return {
          type: ErrorType.S3_CONNECTION_ERROR,
          message: 'S3 service temporarily unavailable',
          originalError: error as Error,
          context,
          retryable: true,
          fallbackAvailable: true
        }
    }
  }

  // Handle network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: ErrorType.NETWORK_ERROR,
      message: 'Network connection failed',
      originalError: error,
      context,
      retryable: true,
      fallbackAvailable: true
    }
  }

  // Handle configuration errors
  if (
    error instanceof Error &&
    error.message.includes('Missing required environment variables')
  ) {
    return {
      type: ErrorType.CONFIGURATION_ERROR,
      message: 'S3 configuration is incomplete',
      originalError: error,
      context,
      retryable: false,
      fallbackAvailable: true
    }
  }

  // Default to unknown error
  return {
    type: ErrorType.UNKNOWN_ERROR,
    message:
      error instanceof Error ? error.message : 'An unknown error occurred',
    originalError: error instanceof Error ? error : undefined,
    context,
    retryable: false,
    fallbackAvailable: true
  }
}

export function shouldRetry(
  error: ErrorDetails,
  attemptCount: number,
  maxRetries: number = 3
): boolean {
  if (attemptCount >= maxRetries) {
    return false
  }

  if (!error.retryable) {
    return false
  }

  // Exponential backoff for retryable errors
  const delay = Math.min(1000 * Math.pow(2, attemptCount), 10000) // Max 10 seconds
  return new Promise(resolve => setTimeout(resolve, delay)).then(() => true)
}

export function getErrorMessage(error: ErrorDetails): string {
  switch (error.type) {
    case ErrorType.S3_CONNECTION_ERROR:
      return 'Unable to connect to photo storage. Please try again later.'

    case ErrorType.S3_PERMISSION_ERROR:
      return 'Photo storage access denied. Please contact support.'

    case ErrorType.S3_NOT_FOUND_ERROR:
      return 'Photo storage not found. Please contact support.'

    case ErrorType.S3_METADATA_ERROR:
      return 'Some photo information could not be loaded.'

    case ErrorType.S3_SIGNED_URL_ERROR:
      return 'Unable to generate secure photo links.'

    case ErrorType.API_ERROR:
      return 'Photo service temporarily unavailable.'

    case ErrorType.NETWORK_ERROR:
      return 'Network connection failed. Please check your internet connection.'

    case ErrorType.CONFIGURATION_ERROR:
      return 'Photo service is not properly configured.'

    default:
      return 'An unexpected error occurred while loading photos.'
  }
}

export function logError(
  error: ErrorDetails,
  additionalContext?: Record<string, any>
): void {
  const logContext = {
    errorType: error.type,
    message: error.message,
    retryable: error.retryable,
    fallbackAvailable: error.fallbackAvailable,
    context: { ...error.context, ...additionalContext },
    timestamp: new Date().toISOString()
  }

  if (
    error.type === ErrorType.UNKNOWN_ERROR ||
    error.type === ErrorType.S3_CONNECTION_ERROR
  ) {
    console.error('S3 Photo Error:', logContext)
  } else {
    console.warn('S3 Photo Warning:', logContext)
  }
}
