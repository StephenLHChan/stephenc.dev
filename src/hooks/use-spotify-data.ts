import { useEffect, useState } from 'react'

interface Track {
  id: string
  name: string
  artist: string
  album: string
  image: string
  url: string
  embedUrl: string
}

const useSpotifyData = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [recentTracks, setRecentTracks] = useState<Track[]>([])
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const currentTrackResponse = await fetch('/api/spotify/current')
        const recentTracksResponse = await fetch('/api/spotify/recent')
        const topTracksResponse = await fetch('/api/spotify/top')

        const currentTrackData = await currentTrackResponse.json()
        const recentTracksData = await recentTracksResponse.json()
        const topTracksData = await topTracksResponse.json()

        // Add embed URLs for Spotify embeds
        if (currentTrackData.isPlaying === false) {
          setCurrentTrack(null)
        } else {
          setCurrentTrack({
            ...currentTrackData,
            embedUrl: `https://open.spotify.com/embed/track/${currentTrackData.id}`
          })
        }

        setRecentTracks(
          recentTracksData.recentTracks.map((track: Track) => ({
            ...track,
            embedUrl: `https://open.spotify.com/embed/track/${track.id}`
          }))
        )
        setTopTracks(
          topTracksData.topTracks.map((track: Track) => ({
            ...track,
            embedUrl: `https://open.spotify.com/embed/track/${track.id}`
          }))
        )
      } catch (err) {
        console.error('Error fetching Spotify data:', err)
        setError('Failed to fetch Spotify data.')
      }
    }

    fetchSpotifyData().then(() => {
      setIsLoading(false)
    })
  }, [])

  return { currentTrack, recentTracks, topTracks, error, isLoading }
}

export default useSpotifyData
