const SocialMediaIcon = ({
  link,
  icon: Icon
}: {
  link: string
  icon: React.ElementType
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    >
      <Icon className="w-6 h-6" />
    </a>
  )
}

export default SocialMediaIcon
