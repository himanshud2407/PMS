/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <section className="px-6 lg:px-12 py-32 bg-white relative">
      <div className="max-w-7xl mx-auto text-center relative mb-40">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="absolute rounded-full border border-gray-50"
              style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex justify-center -space-x-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden translate-y-[20px]"
                style={{ marginBottom: `${Math.sin(i) * 40}px` }}
              >
                <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="User" />
              </motion.div>
            ))}
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4 max-w-2xl mx-auto leading-tight">
            Join our health community and take the first step towards a healthier you.
          </h2>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-8xl md:text-[12rem] font-bold font-display text-primary tracking-tighter"
          >
            10,000,000
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Footer Card */}
      <footer className="max-w-4xl mx-auto bg-gray-soft rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
        <div className="flex items-center gap-2 mb-6 md:mb-0">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8L8 12L12 16L16 12L12 8Z" fill="white"/>
            </svg>
          </div>
          <span className="text-2xl font-bold font-display tracking-tight">Lunira</span>
        </div>

        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <a href="#" className="font-semibold hover:text-primary transition-colors">Sign In</a>
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition-all">
            Get In Touch
          </button>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-primary">
            <Facebook size={20} />
          </a>
          <a href="#" className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-primary">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-primary">
            <Instagram size={20} />
          </a>
        </div>
      </footer>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between text-xs text-gray-400 px-8">
        <div className="flex gap-8 mb-4 md:mb-0">
          <a href="#" className="hover:text-dark">About V1</a>
          <a href="#" className="hover:text-dark">About V2</a>
          <a href="#" className="hover:text-dark">About V3</a>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-dark">Style Guide</a>
          <a href="#" className="hover:text-dark">Licensing</a>
          <a href="#" className="hover:text-dark">Change log</a>
        </div>
      </div>
    </section>
  );
}
