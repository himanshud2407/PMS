"use client";

import { motion } from "motion/react";
import { CircularTestimonials } from "./ui/circular-testimonials";
import { TESTIMONIALS } from "../constants";
import FloatingMedicalParticles from "./3d/FloatingMedicalParticles";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 lg:px-12 py-24 bg-white relative overflow-hidden">
      {/* 3D ambient floating particles */}
      <FloatingMedicalParticles count={5} />

      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] mb-3 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#59afb5] animate-ping" />
          Patient Feedback & Trust
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight max-w-3xl mx-auto text-gray-900 mb-4">
          See What Our Patients Say About Us
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs sm:text-sm font-semibold shadow-xs">
          <span>⭐ 4.8 / 5.0</span>
          <span className="text-amber-300">•</span>
          <span>1,000+ Verified Doorstep Lab Reviews</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-12 border border-gray-100 shadow-xl">
        <CircularTestimonials 
          testimonials={TESTIMONIALS}
          autoplay={true}
          colors={{
            name: "#0f172a",
            designation: "#64748b",
            testimony: "#334155",
            arrowBackground: "#1e293b",
            arrowForeground: "#f8fafc",
            arrowHoverBackground: "#59AFB5",
          }}
          fontSizes={{
            name: "2rem",
            designation: "1.1rem",
            quote: "1.25rem",
          }}
        />
      </div>

      {/* 3D Soft Light Orbs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.12, scale: 1 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[140px] -mr-64 -mt-64 pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[140px] -ml-64 -mb-64 pointer-events-none"
      />
    </section>
  );
}

