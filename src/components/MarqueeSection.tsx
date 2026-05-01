/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion } from 'motion/react';

const PARTNERS = [
  "Advanced Diagnostics",
  "Personalized Care",
  "Global Standards",
  "Expert Specialists",
  "Modern Equipment",
  "24/7 Support",
  "Patient Safety",
  "Accurate Results"
];

export default function MarqueeSection() {
  return (
    <div className="py-10 bg-white border-y border-gray-100 overflow-hidden select-none">
      <div className="flex overflow-hidden group">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 whitespace-nowrap px-10 items-center"
        >
          {/* Double the array for seamless looping */}
          {[...PARTNERS, ...PARTNERS].map((item, i) => (
            <div key={i} className="flex items-center gap-20">
              <span className="text-4xl md:text-6xl font-display font-bold text-gray-100/80 uppercase tracking-tighter transition-colors hover:text-primary/20">
                {item}
              </span>
              <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
