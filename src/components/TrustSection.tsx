"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import StatCounter from "./3d/StatCounter";
import FloatingMedicalParticles from "./3d/FloatingMedicalParticles";

const TrustSection: React.FC = () => {
  return (
    <section
      id="trust"
      className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative overflow-hidden"
      data-purpose="trust-section"
    >
      <FloatingMedicalParticles count={4} />

      {/* Header */}
      <div className="text-center mb-16 relative z-10" data-purpose="section-header">
        <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] mb-3 block">
          Trusted Clinical Care
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#1a1a1a]">
          Why families trust Dr. Baviskar Pathology Lab?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
          Faster, safer and more reliable diagnostic care — right at your doorstep in Pune.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Trust Pillars */}
        <div className="space-y-8" data-purpose="trust-pillars">
          {[
            {
              title: "Certified and Experienced Professionals",
              desc: "Our in-house clinical team with over 5+ years of diagnostic experience delivers hospital-grade care at home with precision, compassion, and accountability.",
              icon: "/professional.png",
              bgColor: "bg-[#f0f4ff]",
            },
            {
              title: "24×7 Customer Support",
              desc: "Our round-the-clock support team is always available to guide, assist, and resolve your health concerns instantly via WhatsApp and call.",
              icon: "/support.png",
              bgColor: "bg-[#f0f4ff]",
            },
            {
              title: "Transparent & Honest Pricing",
              desc: "We believe families deserve clarity, not surprises. Every diagnostic test comes with clear, upfront pricing and zero hidden charges.",
              icon: "/pricing.png",
              bgColor: "bg-[#fffbeb]",
            },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex gap-5 p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-gray-100/80 shadow-xs hover:shadow-lg hover:border-primary/20 transition-all cursor-default group"
              data-purpose="pillar-item"
            >
              <div
                className={`flex-shrink-0 w-14 h-14 ${pillar.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs`}
              >
                <Image
                  alt={pillar.title}
                  className="w-8 h-8 object-contain rounded-full"
                  src={pillar.icon}
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#1a1a1a] group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Glass Stats Grid */}
        <div
          className="grid grid-cols-2 rounded-3xl overflow-hidden border border-gray-200/80 bg-white/60 backdrop-blur-md shadow-xl"
          data-purpose="stats-grid"
        >
          {/* Stat 1: Patients Served */}
          <div className="p-6 sm:p-8 md:p-12 border-r border-b border-gray-200/80 flex flex-col justify-center hover:bg-primary/5 transition-colors group">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-[#1a1a1a] group-hover:text-primary transition-colors">
              <StatCounter value={20000} suffix="+" />
            </span>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-snug">
              Patients served in Pune
            </p>
          </div>

          {/* Stat 2: Arrival Time */}
          <div className="p-6 sm:p-8 md:p-12 border-b border-gray-200/80 flex flex-col justify-center hover:bg-primary/5 transition-colors group">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-[#1a1a1a] group-hover:text-primary transition-colors">
              <StatCounter value={30} suffix=" Min" />
            </span>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-snug">
              Average doorstep arrival time
            </p>
          </div>

          {/* Stat 3: Rating */}
          <div className="p-6 sm:p-8 md:p-12 border-r border-gray-200/80 flex flex-col justify-center hover:bg-primary/5 transition-colors group">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-[#1a1a1a] group-hover:text-primary transition-colors">
              <StatCounter value={4.8} decimals={1} suffix=" ⭐" />
            </span>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-snug">
              Average rating from 1,000+ reviews
            </p>
          </div>

          {/* Stat 4: Reduction */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center hover:bg-primary/5 transition-colors group">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-[#1a1a1a] group-hover:text-primary transition-colors">
              <StatCounter value={65} suffix="%" />
            </span>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-snug">
              Reduction in hospital trips with doorstep care
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

