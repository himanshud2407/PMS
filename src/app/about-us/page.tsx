"use client";

import React from 'react';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import TeamSection from '../../components/TeamSection';

// Move metadata to a separate file or handle it differently since we are using "use client"
// For now, I'll keep the component but it needs to be a client component for animations
// Actually, Next.js allows metadata in server components. 
// If I need "use client", I should split it. 
// Let's make the main content a client component and export metadata from the page.

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <main>
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden py-24">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 blur-3xl bg-primary rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20"
              >
                Our Legacy & Future
              </motion.span>
              
              <motion.h1 
                variants={fadeInUp}
                className="font-display text-5xl md:text-7xl font-bold text-on-surface leading-[1.1]"
              >
                Pioneering <span className="text-gradient">Precision</span> in Clinical Diagnostics.
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-on-surface-variant leading-relaxed max-w-xl"
              >
                Founded in 1998, Dr. Baviskar Pathology Lab has been at the forefront of medical diagnostic innovation in Pune. We merge advanced robotics with human expertise to deliver accuracy you can trust.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 pt-4">
                <div className="group">
                  <div className="text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform origin-left">25+</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Years of Trust</div>
                </div>
                <div className="w-px h-12 bg-outline-variant/50 hidden sm:block" />
                <div className="group">
                  <div className="text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform origin-left">2M+</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Patient Samples</div>
                </div>
                <div className="w-px h-12 bg-outline-variant/50 hidden sm:block" />
                <div className="group">
                  <div className="text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform origin-left">100+</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Specialized Tests</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(29,104,242,0.2)] border-8 border-white">
                <img 
                  alt="Modern Laboratory" 
                  className="w-full h-full object-cover" 
                  src="/clinic.png"
                />
              </div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 glass-card p-8 rounded-2xl max-w-xs hidden md:block"
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-4" data-icon="format_quote">format_quote</span>
                <p className="text-lg font-medium text-on-surface leading-tight italic">
                  "Accuracy is not just our goal; it's our foundational promise to every patient."
                </p>
                <p className="mt-4 text-sm font-bold text-on-surface-variant">— Dr. Baviskar, Founder</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section with Floating Cards */}
        <section className="py-32 bg-surface-container-lowest relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#59AFB5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-6">Guided by Purpose</h2>
              <p className="text-xl text-on-surface-variant">Our values define how we treat every sample and every person who walks through our doors.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-8 group relative overflow-hidden bg-white p-12 rounded-3xl border border-outline-variant shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <span className="material-symbols-outlined text-5xl text-primary mb-8 bg-primary/10 p-4 rounded-2xl" data-icon="rocket_launch">rocket_launch</span>
                <h3 className="font-display text-3xl font-bold text-on-surface mb-6">Our Mission</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">To empower healthcare providers and patients with rapid, precise diagnostic insights that lead to better clinical outcomes and improved quality of life. We leverage cutting-edge technology and human expertise to redefine the standard of care in Pune and beyond.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-4 bg-primary p-12 rounded-3xl shadow-xl text-on-primary flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div>
                  <span className="material-symbols-outlined text-5xl mb-8 bg-white/20 p-4 rounded-2xl" data-icon="visibility">visibility</span>
                  <h3 className="font-display text-3xl font-bold mb-6">Our Vision</h3>
                  <p className="text-lg opacity-90 leading-relaxed">To be the most trusted name in diagnostic healthcare globally, setting benchmarks for innovation, integrity, and patient-first services.</p>
                </div>
              </motion.div>

              {[
                { icon: 'verified_user', title: 'Integrity', desc: 'Unwavering ethical standards in every test we process.' },
                { icon: 'biotech', title: 'Innovation', desc: 'Constant investment in the latest diagnostic platforms.' },
                { icon: 'favorite', title: 'Empathy', desc: 'Treating every patient with dignity and personal care.' }
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  className="md:col-span-4 bg-white p-10 rounded-3xl border border-outline-variant shadow-sm hover:-translate-y-2 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-4xl text-primary mb-6 group-hover:scale-110 transition-transform" data-icon={val.icon}>{val.icon}</span>
                  <h3 className="font-display text-2xl font-bold text-on-surface mb-4">{val.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Technology Section */}
        {/* <section className="py-32 bg-dark text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-white to-transparent pointer-events-none opacity-5" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">State-of-the-art <br/><span className="text-primary">Medical Infrastructure</span></h2>
                <p className="text-xl text-white/70 leading-relaxed">We invest in the same high-end diagnostic platforms used by the world's leading medical institutions. Our fully automated systems minimize human error and maximize throughput.</p>
                
                <div className="space-y-4">
                  {[
                    "Next-Gen Gene Sequencing (NGS)",
                    "Fully Automated Biochemistry Analyzers",
                    "Advanced Immunoassay Systems",
                    "High-Resolution Imaging Integration"
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#59AFB5]" />
                      <span className="text-lg font-medium text-white/90">{tech}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-full border border-white/10 absolute inset-0 animate-pulse" />
                <div className="aspect-square rounded-full border border-white/5 absolute -inset-10 animate-pulse duration-3000" />
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    alt="Advanced Technology" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjlyOWKb_OmhUxm25SXcElI1arlnS2DeZ7rQbWgiV0-2UMR8PSUxjbh9CVQh33F4Xeuvryy7m32yuvLUR_NB9DYRgCWxZ2G-zKpSs8jZzgH-RJTd1uo__cScp56AoD5ueGqjK-MKvfvMvwW6J_Au6x6oVkViEYKFbAde4JcSiPSIztLvuE5PVCRdletiwlUE2rWctBvrD4WBAEYkzlaViIOddAju4f4rRfEmFgUvQLgWHvNDnm7yTCxXG-HqcgCs2YTWVZDVXqNz4"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Team Section with integrated style */}
        <section className="bg-white">
          <TeamSection />
        </section>

        {/* Modern Call to Action */}
        <section className="py-32 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-primary rounded-[40px] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-primary text-on-primary p-12 md:p-20 rounded-[40px] text-center space-y-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight relative z-10">Experience Premium <br/>Diagnostic Care.</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto relative z-10">Ready to schedule a diagnostic consultation or partner with us for your clinical needs?</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6 relative z-10">
                <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-surface transition-colors active:scale-95">
                  Book Appointment
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors active:scale-95">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
