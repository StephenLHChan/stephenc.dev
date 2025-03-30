'use client'

import { TypeAnimation } from 'react-type-animation'

import Paragraph from '@/components/paragraph'
import ProfilePic from '@/components/profile-pic'
import Section from '@/components/section'
import SectionTitle from '@/components/section-title'
import Spotify from '@/components/spotify'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow text-4xl">
          <TypeAnimation
            sequence={['hey!', 1000, 'this is Stephen...']}
            wrapper="h1"
            cursor={true}
            repeat={0}
            speed={20}
            style={{ display: 'inline-block', whiteSpace: 'pre-line' }}
          />
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 text-center">
          <div className="border-3 border-white/80 w-30 h-30 inline-block rounded-full overflow-hidden">
            <ProfilePic />
          </div>
        </div>
      </div>
      <Section delay={0.2}>
        <SectionTitle>Summary</SectionTitle>
        <div>
          <Paragraph>
            Hello! I am Stephen. I graduated with Bachelor of Engineering in
            Computer Science from The Hong Kong University of Science and
            Technology with more than four years of experience in business
            analysis and quality assurance in IT projects.
          </Paragraph>
          <br />
        </div>
      </Section>
      <Section delay={0.6}>
        <SectionTitle>Interest</SectionTitle>
        <div>
          <Paragraph>
            Coffee,{' '}
            <a
              href="https://www.instagram.com/stepbymie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:underline"
            >
              Photography
            </a>
            {', '}Badminton
          </Paragraph>
        </div>
      </Section>
      <Section delay={1}>
        <Spotify />
      </Section>
    </div>
  )
}

export default Home
