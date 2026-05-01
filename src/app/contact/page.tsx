"use client";

import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
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

import { submitToGoogleSheets } from '@/lib/google-sheets';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      FullName: formData.get('fullName'),
      Email: formData.get('email'),
      ContactNumber: formData.get('contactNumber'),
      Subject: formData.get('subject'),
      Message: formData.get('message'),
    };

    const result = await submitToGoogleSheets(data, 'ContactUs');
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <main>
        {/* Header Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20 mb-6">
                Get In Touch
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-on-background mb-6 leading-tight">
                Contact Our <span className="text-gradient">Experts</span>
              </h1>
              <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
                Have questions about your tests or need to find a location? Our
                team is dedicated to providing you with clear answers and
                professional clinical care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="pb-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] border border-outline-variant shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <h2 className="font-display text-3xl font-bold mb-8 relative z-10">
                Send us a Message
              </h2>
              <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      required
                      className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      required
                      className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                      Contact Number (10 digits)
                    </label>
                    <input
                      name="contactNumber"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                      }}
                      className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="9876543210"
                      type="tel"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                      Subject / Test Type
                    </label>
                    <select 
                      name="subject"
                      required
                      className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                    >
                      <option value="">Select subject...</option>
                      <option>General Inquiry</option>
                      <option>Blood Test</option>
                      <option>Urine Test</option>
                      <option>Stool Test</option>
                      <option>Plasma Test</option>
                      <option>Swab Test</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all min-h-[160px]"
                    placeholder="How can we help you today?"
                    rows={5}
                  ></textarea>
                </div>
                
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-700 rounded-2xl border border-green-200 text-sm font-bold text-center"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}

                <button
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  <span
                    className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
              </form>
            </motion.div>

            {/* Side Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="bg-surface-container-low border border-outline-variant p-10 rounded-[2rem] shadow-sm group hover:border-primary/30 transition-colors">
                <h3 className="font-display text-2xl font-bold mb-8">
                  Direct Contact
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary p-4 rounded-2xl text-on-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined"
                        data-icon="call"
                      >
                        call
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                        Central Helpline
                      </p>
                      <p className="text-2xl font-bold text-on-background">
                        <a href="tel:+918605292626">+91 8605292626</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="bg-primary p-4 rounded-2xl text-on-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined"
                        data-icon="mail"
                      >
                        mail
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                        Email Us
                      </p>
                      <p className="text-2xl font-bold text-on-background">
                        <a href="mailto:info@drbaviskar.com">
                          info@drbaviskar.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-outline-variant p-10 rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    OPEN NOW
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-8">
                  Lab Hours
                </h3>
                <div className="space-y-5 text-on-surface font-medium">
                  <div className="flex justify-between items-center border-b border-outline-variant pb-4">
                    <span>Monday - Saturday</span>
                    <span className="font-bold">07:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center opacity-60">
                    <span>Sunday</span>
                    <span className="font-bold italic">07:00 AM - 02:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regional Centers */}
        {/* <section className="py-32 bg-surface-container-low px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-outline-variant to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Regional Centers</h2>
              <p className="text-xl text-secondary max-w-xl mx-auto">Choose from our state-of-the-art diagnostic facilities across the country for your next appointment.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Central Lab', 
                  addr: '452 Medical Plaza, Suite 100\nDowntown, Metropolitan City',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrTszXTDmZJ6WPqWWlVzcSk_Muyfdln-MlgREJQwqiJI-yRlGHnpLdgt9qBamXOypByNFrshVdVKjcHU5_8mgFcCjLNSFANHBM0n6oneB7d8IhWpEE203pTyxnWj2lnzYfntGri9jWMjusPoaIbujFpl9ApYgo8JObpxKHx2zFjN9JUe_d5Py6AnkbYucsshFxCc2jugW_14wfKLSzqtsNuTbIiTSQGW3CVFo3GxVaO8DeEScDHVzief1XwVncxSZ2nqortgBfrgk'
                },
                { 
                  name: 'West Side Clinic', 
                  addr: '88 Wellness Way\nWestover Suburbs, OH 43016',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARw8QP2CKfaEb1SroRxGKlHVmeO-TKrIIswwX1sajzfJ4c37ubMfwmVvpDNj4u_ELVf7bdeZDvQVZlApUpBqGUumBw8pxtjhxVa1GCy3tAejPCJQ8TquHb_T30dDPFcE_AKEPBjyYALONdLnr9HcAt-soxmKWBEZXsEKd11dkojifs9gz100yX1ru0UKqUY-3a0W5RBjvaHQADIbIGIuPFA4xT60O1_r5eeVzroMokO_2VivCbunalKNOy8QfB6aJtnX-spTrKH7Q'
                },
                { 
                  name: 'North Point Lab', 
                  addr: '1202 Innovation Blvd\nTech Park, WA 98052',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjlyOWKb_OmhUxm25SXcElI1arlnS2DeZ7rQbWgiV0-2UMR8PSUxjbh9CVQh33F4Xeuvryy7m32yuvLUR_NB9DYRgCWxZ2G-zKpSs8jZzgH-RJTd1uo__cScp56AoD5ueGqjK-MKvfvMvwW6J_Au6x6oVkViEYKFbAde4JcSiPSIztLvuE5PVCRdletiwlUE2rWctBvrD4WBAEYkzlaViIOddAju4f4rRfEmFgUvQLgWHvNDnm7yTCxXG-HqcgCs2YTWVZDVXqNz4'
                }
              ].map((center, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2rem] overflow-hidden group shadow-sm border border-outline-variant hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img 
                      alt={center.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src={center.img}
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-display text-2xl font-bold">{center.name}</h4>
                      <span className="text-primary bg-primary/10 p-2 rounded-xl"><span className="material-symbols-outlined" data-icon="location_on">location_on</span></span>
                    </div>
                    <p className="text-secondary mb-8 whitespace-pre-line leading-relaxed font-medium">{center.addr}</p>
                    <a className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform" href="/">
                      Get Directions
                      <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 rounded-[2.5rem] border-8 border-white overflow-hidden h-[450px] relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrTszXTDmZJ6WPqWWlVzcSk_Muyfdln-MlgREJQwqiJI-yRlGHnpLdgt9qBamXOypByNFrshVdVKjcHU5_8mgFcCjLNSFANHBM0n6oneB7d8IhWpEE203pTyxnWj2lnzYfntGri9jWMjusPoaIbujFpl9ApYgo8JObpxKHx2zFjN9JUe_d5Py6AnkbYucsshFxCc2jugW_14wfKLSzqtsNuTbIiTSQGW3CVFo3GxVaO8DeEScDHVzief1XwVncxSZ2nqortgBfrgk")', backgroundPosition: 'center', backgroundSize: 'cover', filter: 'hue-rotate(180deg) brightness(1.2) contrast(0.8)' }} />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
              <div className="absolute bottom-8 left-8 glass-card p-6 rounded-2xl border border-white/40 max-w-xs">
                <p className="font-bold text-lg text-on-background mb-1">Global Coverage</p>
                <p className="text-sm font-medium text-secondary">Showing 12 active state-of-the-art collection centers in Pune District.</p>
              </div>
            </motion.div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-10"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-background leading-tight">
              Need Urgent Results?
            </h2>
            <p className="text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
              Our Express Service provides results within 4 hours for selected
              diagnostic categories. Contact our priority line for immediate
              assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <button className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                Schedule Home Sample
              </button>
              <button className="border-2 border-primary text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary/5 transition-colors active:scale-95">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
