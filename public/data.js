import { Link, Text } from '@chakra-ui/react'

import {
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook
} from 'react-icons/io5'

export const socialMediaList = [
  {
    type: 'LinkedIn',
    link: 'https://www.linkedin.com/in/stephenlhc/',
    icon: IoLogoLinkedin
  },
  {
    type: 'Github',
    link: 'https://github.com/StephenLHChan/',
    icon: IoLogoGithub
  },
  {
    type: 'Instagram',
    link: 'https://www.instagram.com/stephenc.3/',
    icon: IoLogoInstagram
  },
  {
    type: 'Twitter',
    link: 'https://twitter.com/StephenLHChan',
    icon: IoLogoTwitter
  },
  {
    type: 'Facebook',
    link: 'https://www.facebook.com/StephenLHChan',
    icon: IoLogoFacebook
  }
]

export const bioItems = [
  {
    id: 1,
    year: '1992',
    children: <Text>Born in Hong Kong</Text>
  },
  {
    id: 2,
    year: '2016',
    children: (
      <Text>
        Completed Bachelor of Engineering in Computer Science in{' '}
        <Link
          href="https://www.hkust.edu.hk/"
          target="_blank"
          variant="text-link"
        >
          The Hong Kong University of Science and Technology
        </Link>
      </Text>
    )
  },
  {
    id: 3,
    year: '2021',
    children: <Text>Relocated to Toronto, Canada</Text>
  },
  {
    id: 4,
    year: '2022',
    children: (
      <Text>
        Completed Junior Data Analyst Program offered by{' '}
        <Link
          href="https://npowercanada.ca"
          target="_blank"
          variant="text-link"
        >
          NPower Canada
        </Link>
      </Text>
    )
  }
]
