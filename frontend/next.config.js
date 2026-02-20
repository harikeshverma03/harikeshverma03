/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/harikeshverma03/',
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/harikeshverma03/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
