/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

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
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            Our Honors
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">
            India’s Trusted Name in Diagnostic Excellence
          </h2>
        </div>
        <div className="text-gray-500 leading-relaxed text-lg">
          <p>
            Proud recipients of multiple healthcare quality awards and
            certifications. Our commitment to accuracy, hygiene, and innovation
            makes us one of the most reliable pathology labs in the region.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
