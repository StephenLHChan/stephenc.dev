const SocialMediaIcon = ({
  type,
  link,
  icon: Icon
}: {
  type: string
  link: string
  icon: React.ElementType
}) => {
  return (
    <a
      key={type}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 transition-colors hover:text-teal-500 dark:hover:text-[#ff63c3]"
    >
      <Icon className="w-10 h-10" />
    </a>
  )
}

export default SocialMediaIcon
