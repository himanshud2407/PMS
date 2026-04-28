/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Activity, Smile, Leaf } from 'lucide-react';

export default function AdvantagesSection() {
  return (
    <section className="px-6 lg:px-12 py-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Advantage</span>
          <h2 className="text-5xl font-display font-medium leading-tight mb-8">
            Maximizing Care Efficiency at Medical Clinics
          </h2>
          <p className="text-gray-500 text-lg mb-12 leading-relaxed">
            We bring together expert care, modern tools, and patient-focused service to make every visit smooth, efficient, and effective.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-full font-semibold transition-all shadow-xl shadow-primary/20">
            Appointment
          </button>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bento Card 1: 95% Chart */}
          <div className="bg-gray-soft rounded-[2.5rem] p-8 col-span-1">
            <div className="flex gap-2 h-40 mb-6 items-end">
              {[60, 80, 45, 90, 70, 55, 85, 40].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-100 rounded-full relative group">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    className="absolute bottom-0 w-full bg-blue-400 rounded-full transition-all group-hover:bg-primary"
                  ></motion.div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-display tracking-tighter">95%</span>
              <p className="text-sm text-gray-500 font-medium">of patients seen within 24 hours.</p>
            </div>
          </div>

          {/* Bento Card 2: 82% Circle */}
          <div className="bg-gray-soft rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                <motion.circle 
                  cx="96" cy="96" r="80" 
                  fill="none" 
                  stroke="#1D68F2" 
                  strokeWidth="2" 
                  strokeDasharray="502.4"
                  initial={{ strokeDashoffset: 502.4 }}
                  whileInView={{ strokeDashoffset: 502.4 * (1 - 0.82) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold font-display">82%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest text-center px-4">experienced better well-being</span>
              </div>
            </div>
            {/* Floating Icons */}
            <div className="absolute top-4 right-4 bg-blue-100 p-2 rounded-full"><Smile size={20} className="text-primary" /></div>
            <div className="absolute bottom-10 left-4 bg-blue-100 p-2 rounded-full"><Leaf size={20} className="text-primary" /></div>
            <div className="absolute top-10 left-10 bg-blue-100 p-2 rounded-full"><Activity size={20} className="text-primary" /></div>
          </div>

          {/* Bento Card 3: Line Chart */}
          <div className="bg-gray-soft rounded-[2.5rem] p-8">
            <p className="text-sm font-semibold mb-2">Improvement in treatment effectiveness</p>
            <p className="text-xs text-gray-400 mb-6">2015 - 2025</p>
            <div className="relative h-32 mb-4">
              <svg className="w-full h-full overflow-visible">
                <motion.path
                  d="M0 100 Q 50 110, 100 80 T 200 40 T 300 10"
                  fill="none"
                  stroke="#12141D"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
                <circle cx="300" cy="10" r="4" fill="#1D68F2" />
              </svg>
              <div className="absolute top-0 right-0 bg-dark text-white text-[10px] px-2 py-1 rounded-md">92%</div>
            </div>
              {/* <div className="absolute bottom-8 right-8 bg-blue-200 p-3 rounded-full">
                <Heart size={20} className="text-primary fill-primary" />
              </div> */}
          </div>

          {/* Bento Card 4: Shop Promo */}
          <div className="bg-blue-400 rounded-[2.5rem] p-4 flex gap-4 items-center">
            <div className="bg-blue-100/30 rounded-2xl p-4 flex-1">
               <img 
                src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=200" 
                alt="Vitamins" 
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 pr-4">
              <h4 className="text-white font-bold mb-4">Check out our multivitamins</h4>
              <button className="bg-white text-dark px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
