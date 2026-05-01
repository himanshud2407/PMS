/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 lg:px-12 py-24 bg-gray-soft/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our FAQ</span>
          <h2 className="text-5xl font-display font-medium leading-tight mb-12">
            Everything you need to know about our medical care in one place
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="text-xl font-bold font-display">{faq.question}</span>
                  <div className="text-primary">
                    {activeIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-500 text-lg leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[3rem] overflow-hidden shadow-2xl h-[600px]"
        >
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
            alt="Doctor and Patient" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
