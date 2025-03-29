import type { Metadata } from 'next'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { BriefcaseBusiness, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Stephen LH Chan',
  openGraph: {
    title: 'About - Stephen LH Chan'
  }
}

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8">
      {/* About Me Section */}
      <section className="flex flex-col md:flex-row items-start gap-6">
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
      </section>
      <Separator className="my-6" />
    </div>
  )
}

export default AboutPage
