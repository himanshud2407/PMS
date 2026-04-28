/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SERVICES } from '../constants';

export default function ServicesSection() {
  return (
    <section className="px-6 lg:px-12 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 flex justify-between items-end">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Services</span>
          <h2 className="text-5xl font-display font-medium leading-tight">
            Expert Healthcare Services <br /> Tailored to Your Well-being
          </h2>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition-all">
          See All Services
        </button>
      </div>

      <div className="relative pt-20 pb-40">
        <div className="flex justify-center items-center gap-4 flex-wrap lg:flex-nowrap">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: window?.innerWidth > 1024 ? service.angle : 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -20, rotate: 0, scale: 1.05, zIndex: 10 }}
              className="relative w-full max-w-[280px] md:w-64 h-96 group cursor-pointer transition-all duration-500"
              style={{
                marginTop: window?.innerWidth > 1024 ? `${Math.abs(service.angle) * 2}px` : '0px'
              }}
            >
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-white text-2xl font-bold font-display">{service.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
