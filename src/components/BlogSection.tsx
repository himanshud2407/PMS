/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { ArrowUpRight, Calendar } from 'lucide-react';
import ButtonWithIcon from './ui/button-with-icon';

export default function BlogSection() {
  return (
    <section id="blog" className="px-6 lg:px-12 py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block underline decoration-2 underline-offset-8">Our Insights</span>
          <h2 className="text-5xl font-display font-medium leading-tight">
            Latest Health Trends & <br /> Wellness Intelligence
          </h2>
        </div>
        <ButtonWithIcon 
          label="Explore All Articles" 
          className="bg-primary text-white shadow-xl shadow-primary/20"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
        {/* Featured Large Post */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 relative group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-xl"
        >
          <img 
            src={BLOG_POSTS[0].image} 
            alt={BLOG_POSTS[0].title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute top-8 left-8 flex items-center gap-4">
             <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
               {BLOG_POSTS[0].tag}
             </span>
             <div className="flex items-center gap-2 text-white/80 text-xs font-medium backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full">
               <Calendar size={12} />
               <span>Oct 24, 2025</span>
             </div>
          </div>
          <div className="absolute bottom-10 left-10 right-10">
            <h3 className="text-white text-3xl font-bold font-display leading-tight mb-4 group-hover:text-blue-200 transition-colors">
              {BLOG_POSTS[0].title}
            </h3>
            <p className="text-white/70 line-clamp-2 max-w-md">
              Discover how our cutting-edge laboratory techniques are revolutionizing patient outcomes and setting new standards in clinical diagnostics.
            </p>
          </div>
        </motion.div>

        {/* Medium Tall Post */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-1 md:row-span-2 relative group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-lg border border-white"
        >
          <img 
            src={BLOG_POSTS[1].image} 
            alt={BLOG_POSTS[1].title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">{BLOG_POSTS[1].tag}</span>
            <h3 className="text-white text-2xl font-bold font-display leading-tight">
              {BLOG_POSTS[1].title}
            </h3>
          </div>
        </motion.div>

        {/* Small Post 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-1 md:row-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:border-primary/20 transition-all duration-500 group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
            <h3 className="text-gray-900 text-lg font-bold font-display leading-snug group-hover:text-primary transition-colors">
              {BLOG_POSTS[2].title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mt-4">
            <span>Read Article</span>
            <ArrowUpRight size={14} />
          </div>
        </motion.div>

        {/* Small Post 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1 md:row-span-1 relative group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-lg"
        >
          <img 
            src={BLOG_POSTS[3].image} 
            alt={BLOG_POSTS[3].title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
             <p className="text-white font-display font-medium text-lg italic">
               "{BLOG_POSTS[3].title}"
             </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end group-hover:opacity-0 transition-opacity">
            <h3 className="text-white font-bold font-display">{BLOG_POSTS[3].title}</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
