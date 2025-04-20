module.exports = {
  reactStrictMode: true,
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
