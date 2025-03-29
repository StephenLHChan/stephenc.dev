import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import useSpotifyData from '@/hooks/use-spotify-data'

import { Button } from '@/components/ui/button' // Adjust the import path based on your project structure
import FadeIn from '@/components/fade-in'

type TrackListType = 'recent' | 'top'

const Spotify = () => {
  const { currentTrack, recentTracks, topTracks, error } = useSpotifyData()
  const [activeList, setActiveList] = useState<TrackListType>('recent')
  const tracksRef = useRef<HTMLDivElement>(null)

  // Memoized derived state for `displayTrack` and `tracksList`
  const { displayTrack, tracksList } = useMemo(() => {
    if (currentTrack) {
      return {
        displayTrack: currentTrack,
        tracksList:
          activeList === 'top'
            ? topTracks.slice(0, 4)
            : recentTracks.slice(0, 4)
      }
    } else {
      return {
        displayTrack: activeList === 'top' ? topTracks[0] : recentTracks[0],
        tracksList:
          activeList === 'top'
            ? topTracks.slice(1, 5)
            : recentTracks.slice(1, 5)
      }
    }
  }, [currentTrack, recentTracks, topTracks, activeList])

  // Scroll to the tracks list if it's not fully visible
  const handleTabClick = (type: TrackListType) => {
    setActiveList(type)

    if (tracksRef.current) {
      const rect = tracksRef.current.getBoundingClientRect()
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

      if (!isFullyVisible) {
        tracksRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
    }
  }

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load Spotify data. Please try again later.
      </p>
    )
  }

  return (
    <div className="w-full">
      {/* Header with title and buttons */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            {currentTrack
              ? 'Now Playing'
              : activeList === 'top'
              ? '#1 Track This Month'
              : 'Recently Played'}
          </p>
          <div className="flex space-x-2">
            <TabButton
              label="Recently Played"
              isActive={activeList === 'recent'}
              onClick={() => handleTabClick('recent')}
            />
            <TabButton
              label="Top Tracks"
              isActive={activeList === 'top'}
              onClick={() => handleTabClick('top')}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        {/* Main Track Display */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0 bg-transparent">
          <AnimatePresence mode="sync">
            <motion.div
              key={displayTrack?.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-transparent"
            >
              {displayTrack && (
                <>
                  {/* Mobile View */}
                  <div className="w-full sm:hidden rounded-xl overflow-hidden bg-transparent">
                    <iframe
                      title="Spotify Web Player"
                      className="w-full h-[80px] bg-transparent"
                      src={displayTrack.embedUrl}
                      allow="encrypted-media"
                      frameBorder="0"
                    />
                  </div>
                  {/* Desktop View */}
                  <div className="hidden sm:block w-full rounded-3xl overflow-hidden bg-transparent">
                    <iframe
                      title="Spotify Web Player"
                      className="w-full h-[352px] bg-transparent"
                      src={displayTrack.embedUrl}
                      allow="encrypted-media"
                      frameBorder="0"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Recent/Top Tracks List */}
        <div ref={tracksRef} className="w-full md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeList}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid gap-3">
                {tracksList.map((track, index) => (
                  <FadeIn key={index} delay={1 + index * 0.3}>
                    <iframe
                      title={`Spotify Track ${index}`}
                      className="w-full rounded-2xl overflow-hidden bg-transparent"
                      src={track.embedUrl}
                      height={80}
                      allow="encrypted-media"
                    />
                  </FadeIn>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Reusable Tab Button Component
const TabButton = ({
  label,
  isActive,
  onClick
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <Button
      onClick={onClick}
      variant={isActive ? 'secondary' : 'ghost'}
      className="px-3 py-1.5 text-sm"
    >
      {label}
    </Button>
  )
}

export default Spotify
