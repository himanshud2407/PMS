import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dr. Baviskar Pathology Lab',
    short_name: 'Baviskar Lab',
    description: 'Best Pathology Lab in Pune for accurate and reliable diagnostic services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#59AFB5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
