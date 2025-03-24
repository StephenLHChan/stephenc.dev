import NextLink from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <NextLink
      href="/"
      className="flex items-center h-[30px] p-[10px] text-[18px] font-bold no-underline"
    >
      <Image src="/apple-touch-icon.png" width={25} height={25} alt="logo" />
      <span className="pl-3 font-bold leading-[20px] font-sans">
        Stephen LH Chan
      </span>
    </NextLink>
  )
}

export default Logo
