import { NextRequest, NextResponse } from 'next/server'
import { getPhotos } from '@/lib/photo-cache'
import { PhotosAPIResponse } from '@/types/s3'

export async function GET(
  _request: NextRequest
): Promise<NextResponse<PhotosAPIResponse>> {
  try {
    const result = await getPhotos()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in photos API route:', error)
    return NextResponse.json({
      photos: [],
      error: 'Internal server error',
      cached: false
    })
  }
}

// Configure caching and revalidation
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-dynamic' // Ensure fresh data on each request
