import React from 'react';
import { Calendar, Clock, ArrowLeft, User, Share2, Bookmark, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ButtonWithIcon from '../../../components/ui/button-with-icon';
import { Metadata } from 'next';
import BlogContentWrapper from './BlogContentWrapper';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

async function getBlogPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    tag,
    author,
    publishedAt,
    readTime,
    image,
    excerpt,
    content,
    seoTitle
  }`;
  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Dr Baviskar Pathology lab',
    };
  }

  return {
    title: `${post.seoTitle || post.title} | Dr Baviskar Pathology lab`,
    description: post.excerpt || `Read our latest article about ${post.title}.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white min-h-screen pb-32">
      <BlogContentWrapper post={post} />
    </article>
  );
}
