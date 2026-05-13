import React from 'react';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import BlogListWrapper from './BlogListWrapper';

export const metadata: Metadata = {
  title: 'Health Blog & Medical News | Dr Baviskar Pathology lab',
  description: 'Stay updated with the latest health tips, medical news, and laboratory updates from Dr Baviskar Pathology lab in Pune.',
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
