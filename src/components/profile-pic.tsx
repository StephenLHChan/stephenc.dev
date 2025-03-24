import Image from 'next/image'

const ProfilePic = () => {
  return (
    <Image
      src="/images/profile-pic.jpeg"
      alt="Profile image"
      width={120}
      height={120}
      className="rounded-full"
    />
  )
}

export default ProfilePic
