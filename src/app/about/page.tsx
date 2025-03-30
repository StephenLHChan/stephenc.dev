import type { Metadata } from 'next'

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
    title: 'Born in Hong Kong',
    icon: Cake,
    description:
      'Born in Hong Kong, Stephen has always been passionate about technology and innovation.'
  },
  {
    time: '2016',
    title: 'Bachelor of Engineering in Computer Science',
    icon: GraduationCap,
    description:
      'Completed Bachelor of Engineering in Computer Science at The Hong Kong University of Science and Technology (HKUST). One of the top universities in Asia.'
  },
  {
    time: '2021',
    title: 'Relocated to Toronto, ON',
    icon: MapPinCheckInside,
    description:
      'Relocated to Toronto, Ontario, Canada, to explore new opportunities and experiences.'
  },
  {
    time: '2022',
    title: 'Cloud Monitoring Engineer',
    icon: BriefcaseBusiness,
    description:
      'Started working as a Cloud Monitoring Engineer at Bank of Montreal (BMO), focusing on cloud infrastructure and monitoring solutions.'
  }
]

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8">
      {/* About Me Section */}
      <Section className="flex flex-col md:flex-row items-start gap-6">
        {/* Left: Profile Picture */}
        <div className="w-full md:w-2/5 flex justify-center">
          <Avatar className="w-full h-full rounded-lg">
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
            {/* Experience Card */}
            <Card className="text-center bg-transparent">
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <BriefcaseBusiness className="w-10 h-10 mb-2" />
                  <h2 className="text-lg">Experience</h2>
                </CardTitle>
                <CardDescription>
                  2+ years
                  <br />
                  Software Engineer
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Education Card */}
            <Card className="text-center bg-transparent">
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <GraduationCap className="w-10 h-10 mb-2" />
                  <h2 className="text-lg">Education</h2>
                </CardTitle>
                <CardDescription>
                  BEng(Hons) in Computer Science from{' '}
                  <a
                    href="https://www.hkust.edu.hk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    HKUST
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Description */}
          <div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Software Engineer | Cloud Innovator | Committed to “Keep Coding,”
              Continuous Learning, and Driving Innovation | Always Striving to
              Become a Great Software Engineer
            </p>
          </div>
        </div>
      </Section>
      <Section delay={0.2}>
        <Separator className="my-6" />
      </Section>
      <Section delay={0.4}>
        <Timeline items={bioItem} />
      </Section>
    </div>
  )
}

export default AboutPage
