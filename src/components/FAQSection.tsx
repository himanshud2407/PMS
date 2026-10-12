"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, Minus, PhoneCall, ShieldCheck } from "lucide-react";
import { FAQS } from "../constants";
import TiltCard from "./3d/TiltCard";
import FloatingMedicalParticles from "./3d/FloatingMedicalParticles";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 lg:px-12 py-24 bg-gradient-to-b from-gray-soft/60 via-white to-gray-soft/40 relative overflow-hidden">
      <FloatingMedicalParticles count={5} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start relative z-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#59afb5] animate-ping" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight mb-8 text-gray-900">
            Everything you need to know about our medical care in one place
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-white/70 border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left transition-colors focus:outline-none"
                  >
                    <span className={`text-lg sm:text-xl font-bold font-display ${isOpen ? "text-primary" : "text-dark"}`}>
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl transition-all ${isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-gray-500 text-base sm:text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Tilt Image with Floating Badges */}
        <div className="relative">
          <TiltCard
            maxTilt={6}
            scale={1.02}
            className="rounded-[3rem] overflow-hidden shadow-2xl h-[540px] sm:h-[620px] relative border border-white/50 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
              alt="Doctor and Patient consultation" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

            {/* 3D Floating Floating Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3.5 z-20 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Hospital-Grade Sterilization</p>
                <p className="text-[10px] text-gray-500">100% Sealed Vacutainers</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-8 right-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/40 flex items-center justify-between z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Have more questions?</p>
                  <p className="text-xs text-gray-500">Speak directly with our clinical desk</p>
                </div>
              </div>
              <a
                href="tel:+918605292626"
                className="px-4 py-2 bg-dark hover:bg-primary text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Call Lab
              </a>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

