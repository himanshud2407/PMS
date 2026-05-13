import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dr Baviskar Pathology lab',
    short_name: 'Dr Baviskar Pathology lab',
    description: 'Best Pathology Lab in Pune for accurate and reliable diagnostic services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#59AFB5',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
