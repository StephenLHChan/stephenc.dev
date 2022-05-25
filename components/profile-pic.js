import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow
} from '@chakra-ui/react'

const ProfilePic = () => {
  return (
    <Popover placement="top" isLazy>
      <PopoverTrigger>
        <Image
          src="/images/profile-pic.png"
          alt="Profile image"
          borderRadius="full"
        />
      </PopoverTrigger>
      <PopoverContent bg="teal.400" color="white">
        <PopoverArrow arrowPadding={12} />
        <PopoverBody fontWeight="semibold">
          Hello! Welcome to my homepage!
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ProfilePic
