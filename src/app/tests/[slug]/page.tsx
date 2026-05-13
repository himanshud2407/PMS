import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TestBookingTrigger from '@/components/TestBookingTrigger'

import { Metadata } from 'next'

async function getTest(slug: string) {
  const query = `*[_type == "test" && slug.current == $slug][0]{
    name,
    price,
    description,
    serviceDetail,
    image,
    category
  }`
  const test = await client.fetch(query, { slug })
  return test
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const test = await getTest(slug)

  if (!test) {
    return {
      title: 'Test Not Found | Dr. Baviskar Pathology Lab',
    }
  }

  return {
    title: `${test.name} | Pathology Test in Pune`,
    description: `${test.name} at Dr Baviskar Pathology lab Pune. ${test.description?.substring(0, 150)}...`,
    openGraph: {
      title: `${test.name} | Dr Baviskar Pathology lab`,
      description: test.description,
      images: test.image ? [urlFor(test.image).url()] : [],
    },
  }
}

export default async function TestDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const test = await getTest(slug)

  if (!test) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{test.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-sm">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            {test.image ? (
              <img
                src={urlFor(test.image).url()}
                alt={test.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                {test.category || 'Laboratory Test'}
              </span>
              <h1 className="text-4xl font-Outfit font-bold text-gray-900 mb-4">{test.name}</h1>
              <p className="text-2xl font-bold text-gray-900 mb-6">₹{test.price}</p>
              <div className="h-px bg-gray-100 w-full mb-6" />
            </div>

            <div className="prose prose-blue max-w-none mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {test.description}
              </p>
              
              <h3 className="text-lg font-bold text-gray-900 mb-4">Service Details</h3>
              <div className="text-gray-600 leading-relaxed">
                {test.serviceDetail ? (
                  <PortableText value={test.serviceDetail} />
                ) : (
                  <p>Contact us for more information about this service.</p>
                )}
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <TestBookingTrigger testName={test.name} />
              <Link 
                href="/contact"
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-center py-4 rounded-xl font-bold transition-all"
              >
                Inquire More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
