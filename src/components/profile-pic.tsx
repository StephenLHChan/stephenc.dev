import Image from 'next/image'

const ProfilePic = () => {
  return (
    <Image
      src="/images/profile-pic.jpeg"
      alt="Profile image"
      width={180}
      height={180}
      className="rounded-full"
    />
  )
}

export default ProfilePic
