import Link from 'next/link'

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-4 w-full">
      <span className="text-gray-600">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()}{' '}
          <Link href="/" className="hover:underline">
            Stephen LH Chan
          </Link>
          . All Rights Reserved.
        </p>
      </span>
    </div>
  )
}

export default Footer
