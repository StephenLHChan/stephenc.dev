import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'

// Function to get a new access token using the refresh token
const getAccessToken = async () => {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  )

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN!
    })
  })

  return response.json()
}

// Function to fetch top tracks
const getTopTracks = async (accessToken: string) => {
  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (response.status === 204 || response.status > 400) {
    return null // No top tracks available
  }

  return response.json()
}

// Named export for the GET method
export async function GET(_: NextRequest) {
  try {
    const { access_token } = await getAccessToken()
    const topTracks = await getTopTracks(access_token)

    if (!topTracks) {
      return NextResponse.json({ topTracks: [] }, { status: 200 })
    }

    // Map the top tracks to a simplified structure
    const tracks = topTracks.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      album: item.album.name,
      image: item.album.images[0]?.url,
      url: item.external_urls.spotify
    }))

    return NextResponse.json({ topTracks: tracks }, { status: 200 })
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch top tracks' },
      { status: 500 }
    )
  }
}
