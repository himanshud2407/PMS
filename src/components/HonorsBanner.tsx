/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function HonorsBanner() {
  return (
    <section className="px-6 lg:px-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-gray-soft rounded-[2.5rem] p-12 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Honors</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">
            First central laboratory in clinical research
          </h2>
        </div>
        <div className="text-gray-500 leading-relaxed text-lg">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
