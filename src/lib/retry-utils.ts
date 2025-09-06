import { analyzeError } from './error-handler'

export interface RetryOptions {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
  backoffMultiplier?: number
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  let lastError: Error | undefined

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Don't retry on the last attempt
      if (attempt === opts.maxRetries) {
        break
      }

      const errorDetails = analyzeError(error, {
        attempt,
        maxRetries: opts.maxRetries
      })

      // Don't retry if error is not retryable
      if (!errorDetails.retryable) {
        break
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        opts.baseDelay * Math.pow(opts.backoffMultiplier, attempt),
        opts.maxDelay
      )

      console.warn(
        `Retry attempt ${attempt + 1}/${opts.maxRetries} after ${delay}ms:`,
        errorDetails.message
      )

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

export async function withRetryAndFallback<T, F>(
  operation: () => Promise<T>,
  fallback: () => Promise<F>,
  options: RetryOptions = {}
): Promise<T | F> {
  try {
    return await withRetry(operation, options)
  } catch (error) {
    const errorDetails = analyzeError(error, {
      operation: 'withRetryAndFallback'
    })

    if (errorDetails.fallbackAvailable) {
      console.warn('Operation failed, using fallback:', errorDetails.message)
      return await fallback()
    }

    throw error
  }
}

export function createRetryableOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
) {
  return () => withRetry(operation, options)
}

export function createRetryableOperationWithFallback<T, F>(
  operation: () => Promise<T>,
  fallback: () => Promise<F>,
  options: RetryOptions = {}
) {
  return () => withRetryAndFallback(operation, fallback, options)
}
