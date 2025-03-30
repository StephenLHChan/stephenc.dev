import type { Metadata } from 'next'

import Paragraph from '@/components/paragraph'
import Section from '@/components/section'
import Timeline from '@/components/timeline'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import {
  BriefcaseBusiness,
  Cake,
  GraduationCap,
  MapPinCheckInside
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Stephen LH Chan',
  openGraph: {
    title: 'About - Stephen LH Chan'
  }
}

const bioItem = [
  {
    time: '1992',
    title: 'Born in Hong Kong 🇭🇰',
    icon: Cake,
    description:
      'Born in Hong Kong, where dim sum is life 🥟, and technology was just an excuse to avoid doing chores. I’ve been tinkering with gadgets and dreaming of innovation ever since.'
  },
  {
    time: '2016',
    title: 'BEng(Hons) in Computer Science | HKUST 🎓',
    icon: GraduationCap,
    description:
      'Graduated with a BEng(Hons) in Computer Science from HKUST, one of Asia’s top universities 🌏. My parents finally stopped asking, "When will you get a real job?" 😅'
  },
  {
    time: '2021',
    title: 'Relocated to Toronto, ON 🇨🇦',
    icon: MapPinCheckInside,
    description:
      'Moved to Toronto, ON, in search of maple syrup 🍁, snowstorms ❄️, and a new adventure 🚀. Turns out, the snow is colder than expected 🥶, but the opportunities are warmer!'
  },
  {
    time: '2022',
    title: 'Software Engineer | BMO 💻',
    icon: BriefcaseBusiness,
    description:
      'Joined BMO as a Software Engineer, where I keep an eye on the clouds ☁️—not the fluffy ones in the sky, but the ones that power the internet 🌐. I’m all about cloud innovation and making sure our systems run smoother than a fresh jar of peanut butter.'
  }
]

const AboutPage = () => {
  const cards = [
    {
      title: 'Experience',
      icon: <BriefcaseBusiness className="w-10 h-10 mb-2" />,
      description: (
        <>
          2+ years
          <br />
          Software Engineer
        </>
      )
    },
    {
      title: 'Education',
      icon: <GraduationCap className="w-10 h-10 mb-2" />,
      description: (
        <>
          BEng(Hons) in Computer Science from{' '}
          <a
            href="https://www.hkust.edu.hk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            HKUST
          </a>
        </>
      )
    }
  ]

  return (
    <div className="container mx-auto py-8">
      {/* About Me Section */}
      <Section className="flex flex-col md:flex-row items-start gap-6">
        {/* Left: Profile Picture */}
        <div className="w-full md:w-2/5 flex justify-center">
          <Avatar className="w-full h-full rounded-2xl">
            <AvatarImage
              src="/images/about/profile-pic.jpeg"
              alt="Stephen LH Chan"
            />
          </Avatar>
        </div>

        {/* Right: Experience, Education, and Description */}
        <div className="w-full md:w-3/5 space-y-6">
          {/* Cards for Experience and Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, index) => (
              <Card key={index} className="text-center bg-transparent">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    {card.icon}
                    <h2 className="text-lg">{card.title}</h2>
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Description */}
          <div>
            <Paragraph className="mt-2 text-gray-600 dark:text-gray-400">
              Software Engineer | Cloud Innovator | Committed to “Keep Coding,”
              Continuous Learning, and Driving Innovation | Always Striving to
              Become a Great Software Engineer
            </Paragraph>
          </div>
        </div>
      </Section>
      <Section delay={0.2}>
        <Separator className="my-6" />
      </Section>
      <Section delay={0.4}>
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left: Timeline Label */}
          <div className="w-full md:w-1/6 flex justify-center md:justify-start">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Timeline
            </h2>
          </div>

          {/* Right: Timeline Component */}
          <div className="w-full md:w-5/6">
            <Timeline items={bioItem} />
          </div>
        </div>
      </Section>
      <Section delay={0.6}>
        <Separator />
      </Section>
    </div>
  )
}

export default AboutPage
