import { NextRequest, NextResponse } from 'next/server'
import { getSubfolders } from '@/lib/photo-cache'
import { SubfoldersAPIResponse } from '@/types/s3'

export async function GET(
  _request: NextRequest
): Promise<NextResponse<SubfoldersAPIResponse>> {
  try {
    const result = await getSubfolders()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in subfolders API route:', error)
    return NextResponse.json({
      subfolders: [],
      error: 'Internal server error',
      cached: false
    })
  }
}

// Configure caching and revalidation
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-dynamic' // Ensure fresh data on each request
