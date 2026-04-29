/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CircularTestimonials } from './ui/circular-testimonials';
import { TESTIMONIALS } from '../constants';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 lg:px-12 py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">Testimonials</span>
        <h2 className="text-5xl font-display font-medium leading-tight max-w-3xl mx-auto">
          See Our Patient Feedback from Those Who Trust Us
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <CircularTestimonials 
          testimonials={TESTIMONIALS}
          autoplay={true}
          colors={{
            name: "#0f172a",
            designation: "#64748b",
            testimony: "#334155",
            arrowBackground: "#1e293b",
            arrowForeground: "#f8fafc",
            arrowHoverBackground: "#3b82f6",
          }}
          fontSizes={{
            name: "2rem",
            designation: "1.1rem",
            quote: "1.25rem",
          }}
        />
      </div>

      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"
      />
    </section>
  );
}
