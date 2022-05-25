import { Link, Icon } from '@chakra-ui/react'

const SocialMediaIcon = ({ type, link, icon }) => {
  return (
    <Link key={type} href={link} variant="icon-link" target="_blank" p={2}>
      <Icon key={type} as={icon} fontSize="40px" />
    </Link>
  )
}

export default SocialMediaIcon
