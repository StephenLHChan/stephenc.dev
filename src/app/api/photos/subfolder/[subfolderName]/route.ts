import { NextRequest, NextResponse } from 'next/server'
import { createS3PhotoService } from '@/lib/s3-service-factory'
import { isS3Enabled } from '@/lib/s3-config'
import { PhotosAPIResponse } from '@/types/s3'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ subfolderName: string }> }
): Promise<NextResponse<PhotosAPIResponse>> {
  try {
    const { subfolderName } = await params

    // Validate subfolder name
    if (!subfolderName || subfolderName.trim() === '') {
      return NextResponse.json(
        {
          photos: [],
          error: 'Invalid subfolder name',
          cached: false
        },
        { status: 400 }
      )
    }

    // Decode URL-encoded subfolder name
    const decodedSubfolderName = decodeURIComponent(subfolderName)

    // Check if S3 is enabled and available
    if (!isS3Enabled()) {
      console.warn('S3 is not configured, returning empty photos')
      return NextResponse.json({
        photos: [],
        error: 'S3 not configured',
        cached: false
      })
    }

    // Create S3 service
    const s3Service = createS3PhotoService()
    if (!s3Service) {
      console.error('Failed to create S3 service')
      return NextResponse.json({
        photos: [],
        error: 'S3 service unavailable',
        cached: false
      })
    }

    // Fetch photos from specific subfolder
    const photos = await s3Service.listPhotosInSubfolder(decodedSubfolderName)

    if (photos.length === 0) {
      return NextResponse.json({
        photos: [],
        error: `No photos found in subfolder: ${decodedSubfolderName}`,
        cached: false
      })
    }

    return NextResponse.json({
      photos,
      cached: false
    })
  } catch (error) {
    console.error('Error in subfolder photos API route:', error)

    // Check if it's a "not found" type error
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        {
          photos: [],
          error: 'Subfolder not found',
          cached: false
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        photos: [],
        error: 'Internal server error',
        cached: false
      },
      { status: 500 }
    )
  }
}

// Configure caching and revalidation
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-dynamic' // Ensure fresh data on each request
