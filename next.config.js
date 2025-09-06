module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stephenc-dev-photos.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/photos/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/LinkedIn',
        destination: 'https://www.linkedin.com/in/stephenlhc',
        permanent: false
      },
      {
        source: '/GitHub',
        destination: 'https://github.com/StephenLHChan',
        permanent: false
      },
      {
        source: '/LeetCode',
        destination: 'https://leetcode.com/u/stephenlhc/',
        permanent: false
      }
    ]
  }
}
