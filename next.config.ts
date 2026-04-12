import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  headers: async () => [
    {
      source: '/sw.js',
      headers: [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'Expires', value: '0' },
      ],
    },
    {
      source: '/manifest.json',
      headers: [
        { key: 'Cache-Control', value: 'no-cache' },
      ],
    },
  ],
}

export default nextConfig
