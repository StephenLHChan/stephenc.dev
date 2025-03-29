'use client'

import { TypeAnimation } from 'react-type-animation'

import BioItem from '@/components/bioItem'
import Paragraph from '@/components/paragraph'
import ProfilePic from '@/components/profile-pic'
import Section from '@/components/section'
import SectionTitle from '@/components/section-title'
import Spotify from '@/components/spotify'

const bioItems = [
  {
    id: 1,
    year: '1992',
    children: <p>Born in Hong Kong</p>
  },
  {
    id: 2,
    year: '2016',
    children: (
      <p>
        Completed Bachelor of Engineering in Computer Science in{' '}
        <a
          href="https://www.hkust.edu.hk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-500 dark:hover:text-[#ff63c3] hover:underline"
        >
          The Hong Kong University of Science and Technology
        </a>
      </p>
    )
  },
  {
    id: 3,
    year: '2021',
    children: <p>Relocated to Toronto, ON</p>
  },
  {
    id: 4,
    year: '2022',
    children: (
      <p>
        Completed Junior Data Analyst Program offered by{' '}
        <a
          href="https://npowercanada.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-500 dark:hover:text-[#ff63c3] hover:underline"
        >
          NPower Canada
        </a>
      </p>
    )
  },
  {
    id: 5,
    year: '2022',
    children: (
      <p>
        Start working as Cloud Monitoring Engineer at{' '}
        <a
          href="https://www.bmo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-500 dark:hover:text-[#ff63c3] hover:underline"
        >
          BMO
        </a>
      </p>
    )
  }
]

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow text-4xl">
          <TypeAnimation
            sequence={['hey! this is Stephen ...']}
            wrapper="h1"
            cursor={true}
            repeat={0}
            speed={40}
            style={{ display: 'inline-block' }}
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

      <Section delay={0.4}>
        <SectionTitle>Bio</SectionTitle>
        {bioItems.map(({ id, year, children }) => {
          return (
            <BioItem key={id} id={String(id)} year={year} content={children} />
          )
        })}
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
      <Section>
        <Spotify />
      </Section>
    </div>
  )
}

export default Home
