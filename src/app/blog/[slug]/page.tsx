"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { BLOG_POSTS } from '../../../constants';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, Share2, Bookmark, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ButtonWithIcon from '../../../components/ui/button-with-icon';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = BLOG_POSTS.find(p => p.title.toLowerCase().replace(/ /g, '-') === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="text-4xl font-display font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">We couldn't find the article you're looking for. It might have been moved or deleted.</p>
        <Link href="/blog">
          <ButtonWithIcon label="Back to Blog" className="bg-primary text-white" />
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-32">
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
                  <span>Medical Staff</span>
                </div>
                <div className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {post.date}</div>
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
          className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
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
            <p className="text-xl text-gray-500 leading-relaxed italic mb-12 border-l-4 border-primary pl-8 py-2 bg-gray-50 rounded-r-2xl">
              {post.description}
            </p>
            
            <h2 className="font-display font-bold text-3xl mb-6">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              In the rapidly evolving landscape of modern medicine, diagnostic accuracy remains the cornerstone of effective patient care. At Dr. Baviskar Pathology Lab, we are committed to leveraging the latest scientific advancements to provide insights that not only diagnose but also predict and prevent potential health issues.
            </p>

            <h2 className="font-display font-bold text-3xl mb-6">Advancements in the Field</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our research indicates that the integration of molecular diagnostics with traditional laboratory techniques significantly enhances the sensitivity of early-stage detection. This article explores the specific methodologies we've adopted and how they translate to better clinical outcomes for our patients in Pune and beyond.
            </p>

            <div className="bg-dark p-12 rounded-[2.5rem] my-12 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold font-display mb-4">Did You Know?</h3>
                 <p className="text-gray-400 leading-relaxed">
                   Early detection of chronic metabolic disorders can increase treatment success rates by over 60% compared to late-stage intervention.
                 </p>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              We continue to expand our testing catalog and invest in state-of-the-art equipment to ensure that your health is always monitored with the highest degree of precision. Stay tuned for more updates as we continue our mission to empower individuals through laboratory excellence.
            </p>
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
    </article>
  );
}
