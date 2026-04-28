/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';

export default function BlogSection() {
  return (
    <section className="px-6 lg:px-12 py-24 bg-white">
      <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Blog</span>
          <h2 className="text-5xl font-display font-medium leading-tight">
            Latest Health Trends and <br /> Wellness Tips for Better Living
          </h2>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition-all">
          Read More
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative h-96 rounded-[2.5rem] overflow-hidden shadow-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {post.tag}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white text-xl font-bold font-display leading-tight group-hover:text-blue-100 transition-colors">
                  {post.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
