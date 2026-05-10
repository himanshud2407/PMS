"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, Share2, Bookmark, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

export default function BlogContentWrapper({ post }: { post: any }) {
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Recently';

  return (
    <>
      {/* Article Header */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gray-50 to-white -z-10" />
         
         <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary font-bold text-sm transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Journal
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] w-fit">
                {post.tag}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-dark leading-[1.1]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <span>{post.author || 'Medical Staff'}</span>
                </div>
                <div className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {formattedDate}</div>
                <div className="flex items-center gap-2"><Clock size={18} className="text-primary" /> {post.readTime}</div>
              </div>
            </motion.div>
         </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl bg-gray-50"
        >
          {post.image ? (
            <img 
              src={urlFor(post.image).url()} 
              alt={post.image.alt || post.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-300">
                No featured image
             </div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Side Actions */}
          <aside className="lg:w-20 flex lg:flex-col gap-4 sticky top-32 h-fit">
             <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                <Share2 size={20} />
             </button>
             <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                <Bookmark size={20} />
             </button>
             <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                <MessageCircle size={20} />
             </button>
          </aside>

          {/* Main Body */}
          <div className="flex-grow prose prose-lg prose-blue max-w-none">
            {post.excerpt && (
              <p className="text-xl text-gray-500 leading-relaxed italic mb-12 border-l-4 border-primary pl-8 py-2 bg-gray-50 rounded-r-2xl">
                {post.excerpt}
              </p>
            )}
            
            <div className="text-gray-600 leading-relaxed">
               {post.content ? (
                 <PortableText 
                   value={post.content} 
                   components={{
                     types: {
                       image: ({ value }: any) => (
                         <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
                           <img
                             src={urlFor(value).url()}
                             alt={value.alt || 'Blog content image'}
                             className="w-full h-auto"
                           />
                         </div>
                       ),
                     },
                   }}
                 />
               ) : (
                 <p>No content available for this post.</p>
               )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-gray-100 flex justify-between items-center">
           <Link href="/blog" className="flex items-center gap-3 font-bold text-dark hover:text-primary transition-colors">
              <ArrowLeft size={18} /> Previous Article
           </Link>
           <Link href="/blog" className="flex items-center gap-3 font-bold text-dark hover:text-primary transition-colors text-right">
              Next Article <ArrowLeft size={18} className="rotate-180" />
           </Link>
        </div>
      </div>
    </>
  );
}
