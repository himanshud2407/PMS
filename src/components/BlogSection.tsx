"use client";

import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import ButtonWithIcon from './ui/button-with-icon';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `*[_type == "blog"] | order(publishedAt desc)[0...4]{
          title,
          "slug": slug.current,
          tag,
          publishedAt,
          readTime,
          image,
          excerpt,
          "featured": coalesce(featured, false)
        }`;
        const data = await client.fetch(query);
        setPosts(data || []);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <div className="h-96 bg-gray-50 animate-pulse" />;
  if (posts.length === 0) return null;

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const otherPosts = posts.filter(p => p.slug !== featuredPost.slug).slice(0, 3);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="blog" className="px-6 lg:px-12 py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-[2px] bg-primary"></span>
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Health Intelligence</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-medium leading-[1.1] text-dark"
            >
              Latest Insights from <br /> <span className="text-gray-400 italic">Our Medical Experts</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/blog">
              <ButtonWithIcon 
                label="View Journal" 
                className="bg-primary text-white hover:bg-primary shadow-2xl shadow-dark/10 transition-all"
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-2xl bg-gray-50">
                {featuredPost.image && (
                  <img 
                    src={urlFor(featuredPost.image).url()} 
                    alt={featuredPost.image.alt || featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute top-8 left-8">
                  <span className="bg-white/90 backdrop-blur-md text-dark px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                    {featuredPost.tag}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-6 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {formatDate(featuredPost.publishedAt)}</span>
                  <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {featuredPost.readTime}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed line-clamp-2 max-w-2xl mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold group/link">
                  <span>Read Article</span>
                  <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side List Posts */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`} className="flex gap-6 items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                    {post.image && (
                      <img 
                        src={urlFor(post.image).url()} 
                        alt={post.image.alt || post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{post.tag}</span>
                    <h3 className="text-lg md:text-xl font-bold font-display leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Newsletter Mini Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-4 bg-gray-soft rounded-[2.5rem] p-8 border border-gray-100 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="text-xl font-bold font-display mb-2">Weekly Wellness</h4>
                <p className="text-gray-500 text-sm mb-6">Get the latest health updates directly in your inbox.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="flex-grow bg-white border border-gray-100 rounded-full px-5 py-2.5 text-sm outline-none focus:border-primary transition-colors shadow-sm"
                  />
                  <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
