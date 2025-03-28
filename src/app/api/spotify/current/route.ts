import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const CURRENT_TRACK_ENDPOINT =
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
  console.log('response', response)
  return response.json()
}

// Function to fetch the currently playing track
const getCurrentTrack = async (accessToken: string) => {
  const response = await fetch(CURRENT_TRACK_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  console.log('response', response)
  if (response.status === 204 || response.status > 400) {
    return null // No track is currently playing
  }

  return response.json()
}

// Named export for the GET method
export async function GET(req: NextRequest) {
  try {
    const { access_token } = await getAccessToken()
    const currentTrack = await getCurrentTrack(access_token)
    console.log('currentTrack', currentTrack)
    if (!currentTrack) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const track = {
      id: currentTrack.item.id,
      name: currentTrack.item.name,
      artist: currentTrack.item.artists
        .map((artist: any) => artist.name)
        .join(', '),
      album: currentTrack.item.album.name,
      image: currentTrack.item.album.images[0].url,
      url: currentTrack.item.external_urls.spotify
    }

    return NextResponse.json(track, { status: 200 })
  } catch (error) {
    console.error('Error fetching current track:', error)
    return NextResponse.json(
      { error: 'Failed to fetch current track' },
      { status: 500 }
    )
  }
}
