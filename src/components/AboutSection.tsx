/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const FEATURES = [
  { text: 'Affordable Healthcare', top: '25%', left: '0%' },
  { text: '24/7 Support', top: '10%', right: '0%' },
  { text: 'Personalized Care', top: '40%', left: '20%' },
  { text: 'Patient Safety', top: '70%', left: '5%' },
  { text: 'Comprehensive Well-Being', bottom: '15%', right: '20%' },
];

export default function AboutSection() {
  return (
    <section className="px-6 lg:px-12 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">About Us</span>
          <h2 className="text-5xl font-display font-medium leading-tight mb-6">
            Providing Advanced Care with Modern Equipment
          </h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition-all mb-16">
            Read More
          </button>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-5xl font-bold font-display mb-2">15</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 font-medium tracking-tight">Years Of Experience</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold font-display mb-2">50+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 font-medium tracking-tight">Certified Specialists</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold font-display mb-2">20+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 font-medium tracking-tight">Medical Achieved</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold font-display mb-2">15k+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 font-medium tracking-tight">Satisfied Customers</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          {/* Animated Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="absolute rounded-full border border-gray-100"
                style={{
                  width: `${i * 180}px`,
                  height: `${i * 180}px`,
                }}
              />
            ))}
          </div>

          {/* Feature Points */}
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="absolute group flex items-center gap-3 z-10"
              style={{
                top: feature.top,
                left: feature.left,
                right: feature.right,
                bottom: feature.bottom
              }}
            >
              <div className="w-3 h-3 bg-primary rounded-full relative">
                <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-semibold whitespace-nowrap bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
