import Link from 'next/link'

import {
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook
} from 'react-icons/io5'
import { SiLeetcode } from 'react-icons/si'
import SocialMediaIcon from './social-media-icon'

const socialMediaList = [
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
    type: 'LeetCode',
    link: 'https://leetcode.com/u/stephenlhc/',
    icon: SiLeetcode
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

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-4 container-width">
      <div className="flex flex-wrap items-center justify-center gap-6 px-6">
        {socialMediaList.map(social => {
          return (
            <div key={social.type}>
              <SocialMediaIcon link={social.link} icon={social.icon} />
            </div>
          )
        })}
      </div>
      <span className="text-gray-600 dark:text-gray-400">
        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()}{' '}
          <Link href="/" className="hover:underline">
            Stephen LH Chan
          </Link>
          . All Rights Reserved.
        </p>
      </span>
    </footer>
  )
}

export default Footer
