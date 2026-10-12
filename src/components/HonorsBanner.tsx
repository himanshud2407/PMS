"use client";

import { motion } from "motion/react";
import TiltCard from "./3d/TiltCard";
import FloatingMedicalParticles from "./3d/FloatingMedicalParticles";
import { Award, ShieldCheck, Cpu } from "lucide-react";

export default function HonorsBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 relative overflow-hidden" id="honor">
      <div className="max-w-7xl mx-auto">
        <TiltCard
          maxTilt={4}
          scale={1.01}
          glareOpacity={0.15}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-white via-gray-50/80 to-[#f2f9f9] p-8 sm:p-14 border border-gray-100 shadow-xl overflow-hidden group"
        >
          {/* Subtle Ambient 3D floating particles */}
          <FloatingMedicalParticles count={5} />

          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#59afb5] animate-ping" />
                Diagnostic Accreditations & Honors
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight text-gray-900 mb-6">
                India’s Trusted Name in Diagnostic Excellence
              </h2>
              <p className="text-gray-500 leading-relaxed text-base sm:text-lg">
                Proud recipients of multiple healthcare quality recognitions and medical certifications.
                Our commitment to absolute clinical precision, strict hygiene protocols, and rapid reporting makes us Pune’s leading choice for patient care.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
              {[
                {
                  icon: ShieldCheck,
                  title: "NABL Standard Quality",
                  desc: "Zero-contamination barcode tracking",
                },
                {
                  icon: Award,
                  title: "15+ Years Trust",
                  desc: "Over 20,000 satisfied patient families",
                },
                {
                  icon: Cpu,
                  title: "Advanced Analyzers",
                  desc: "Fully automated clinical biochemistry",
                },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 6, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug">
                        {badge.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {badge.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

