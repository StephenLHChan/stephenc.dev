import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RECENT_TRACKS_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played'

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

// Function to fetch recent tracks
const getRecentTracks = async (accessToken: string) => {
  const response = await fetch(RECENT_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (response.status === 204 || response.status > 400) {
    return null // No recent tracks available
  }

  return response.json()
}

// Named export for the GET method
export async function GET(_: NextRequest) {
  try {
    const { access_token } = await getAccessToken()
    const recentTracks = await getRecentTracks(access_token)

    if (!recentTracks) {
      return NextResponse.json({ recentTracks: [] }, { status: 200 })
    }

    // Map the recent tracks to a simplified structure
    const tracks = recentTracks.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      image: item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
      playedAt: item.played_at // Timestamp of when the track was played
    }))

    return NextResponse.json({ recentTracks: tracks }, { status: 200 })
  } catch (error) {
    console.error('Error fetching recent tracks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent tracks' },
      { status: 500 }
    )
  }
}
