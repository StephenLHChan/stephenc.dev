import NextLink from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Not found - Stephen LH Chan'
}

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 pt-14 text-center">
      <h1 className="text-3xl font-bold mb-4">Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you&apos;re looking for was not found.
      </p>
      <hr className="my-6 border-gray-300" />
      <div className="my-6">
        <NextLink href="/" passHref>
          <Button variant="outline" className="text-teal-500">
            Return to home
          </Button>
        </NextLink>
      </div>
    </div>
  )
}

export default NotFound
