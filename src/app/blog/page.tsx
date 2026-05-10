import React from 'react';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import BlogListWrapper from './BlogListWrapper';

export const metadata: Metadata = {
  title: 'Medical Journal & News | Dr. Baviskar Pathology Lab',
  description: 'Expert perspectives on clinical diagnostics, wellness trends, and the future of personalized medicine.',
};

async function getBlogPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc){
    title,
    "slug": slug.current,
    tag,
    publishedAt,
    readTime,
    image,
    excerpt,
    "featured": coalesce(featured, false)
  }`;
  return await client.fetch(query);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <BlogListWrapper initialPosts={posts} />
    </div>
  );
}
