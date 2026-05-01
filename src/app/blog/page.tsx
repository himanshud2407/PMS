"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../../constants';
import { Calendar, Clock, ArrowRight, Mail, Search, ChevronRight, Share2, Bookmark } from 'lucide-react';

const categories = ["All Updates", "Health Tips", "Medical News", "Lab Updates", "Technology"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Updates");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All Updates" || post.tag === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Header / Hero */}
      <div className="bg-dark pt-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
          >
            Medical Journal & News
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-medium text-white leading-tight mb-8"
          >
            Insights for a <br /> <span className="text-gray-500 italic">Healthier Tomorrow</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Expert perspectives on clinical diagnostics, wellness trends, and the future of personalized medicine.
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 pb-32">
        
        {/* Featured Post Card */}
        {!searchQuery && activeCategory === "All Updates" && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative bg-white border border-gray-100 p-4 md:p-6 rounded-[3.5rem] shadow-2xl overflow-hidden mb-24"
          >
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
              <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-[2.8rem] relative">
                <img 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src={featuredPost.image}
                />
                <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-8 left-8">
                  <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-lg">
                    Featured Article
                  </span>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center py-6 px-4 md:px-8">
                <div className="flex items-center gap-6 mb-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {featuredPost.readTime}</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-dark leading-[1.1] mb-6 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-10 line-clamp-3">
                  {featuredPost.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                  <Link 
                    href={`/blog/${featuredPost.title.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-primary hover:translate-x-2 transition-all active:scale-95"
                  >
                    Read Full Article <ArrowRight size={18} />
                  </Link>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Bar & Search */}
        <section className="sticky top-24 z-30 mb-16 px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-dark/5 p-3 rounded-[2.5rem] flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all tracking-wide ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search medical topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-6 py-2.5 bg-gray-50/50 border border-transparent rounded-full focus:bg-white focus:border-primary/20 outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article 
                layout
                key={post.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col group"
              >
                <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="flex flex-col flex-grow">
                  <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem] relative mb-8 shadow-lg">
                    <img 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      src={post.image}
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/5">
                        {post.tag}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-2 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {post.readTime}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-3 mb-8 leading-relaxed font-medium">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Read Article <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {/* Newsletter Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-[4rem] p-12 md:p-24 text-center border border-gray-100 shadow-2xl shadow-dark/5 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gray-soft rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-6">Stay Informed</h2>
            <p className="text-lg text-gray-500 mb-12 leading-relaxed">
              Join 5,000+ medical professionals and patients who receive our bi-weekly updates on diagnostics and personalized health.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto bg-gray-soft p-2 rounded-[2rem] border border-gray-100">
              <input 
                className="flex-grow px-8 py-4 rounded-full bg-transparent text-dark placeholder:text-gray-400 outline-none font-medium" 
                placeholder="Your professional email" 
                type="email"
              />
              <button 
                className="bg-dark text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-primary hover:scale-105 active:scale-95 transition-all shadow-xl shadow-dark/10" 
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
