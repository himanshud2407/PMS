/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function TestimonialsSection() {
  const avatars = [
    { src: 'https://i.pravatar.cc/150?u=1' },
    { src: 'https://i.pravatar.cc/150?u=2' },
    { src: 'https://i.pravatar.cc/150?u=3' },
  ];

  return (
    <section className="px-6 lg:px-12 py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 relative h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-full h-full">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-30"
                ></motion.div>
                
                {/* Avatars pattern from image */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  className="absolute top-20 left-10 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden"
                >
                  <img src="https://i.pravatar.cc/150?u=her" alt="User" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-blue-500 border-[12px] border-white shadow-2xl flex items-center justify-center text-white flex-col"
                >
                  <span className="text-4xl font-bold font-display">99%</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter">patient satisfaction</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  className="absolute bottom-20 right-10 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden"
                >
                  <img src="https://i.pravatar.cc/150?u=him" alt="User" />
                </motion.div>
             </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Testimonials</span>
          <h2 className="text-5xl font-display font-medium leading-tight mb-12">
            See Our Patient Feedback from Those Who Trust Us
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold font-display">Exceptional Care</h3>
            <p className="text-gray-500 text-lg leading-relaxed italic">
              "The doctors at MedSync went above and beyond to ensure my treatment was smooth and stress-free. Their use of modern equipment gave me complete confidence throughout the process."
            </p>
            <div>
              <p className="font-bold text-xl">sarah Rosen</p>
              <p className="text-gray-400">Patient of Cardiology</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
