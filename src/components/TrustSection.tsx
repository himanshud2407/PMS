/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Image from 'next/image';

const TrustSection: React.FC = () => {
  return (
    <section
      id="trust"
      className="max-w-7xl mx-auto px-6 py-16 md:py-24"
      data-purpose="trust-section"
    >
      {/* Header */}
      <div className="text-center mb-16" data-purpose="section-header">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#1a1a1a]">
          Why families trust Dr. Baviskar Pathology Lab?
        </h2>
        <p className="text-lg text-gray-600 font-medium">
          Faster, safer and more reliable healthcare — right at your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Trust Pillars */}
        <div className="space-y-10" data-purpose="trust-pillars">
          {/* Pillar 1 */}
          <div className="flex gap-5" data-purpose="pillar-item">
            <div className="flex-shrink-0 w-12 h-12 bg-[#f0f4ff] rounded-full flex items-center justify-center">
              <Image
                alt="Certified Professionals"
                className="w-8 h-8 object-contain rounded-full"
                src="/professional.png"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">
                Certified and Experienced Professionals
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our in-house professionals with a minimum of 5 years of clinical
                experience deliver hospital-grade care at home with precision,
                compassion, and accountability.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex gap-5" data-purpose="pillar-item">
            <div className="flex-shrink-0 w-12 h-12 bg-[#f0f4ff] rounded-full flex items-center justify-center">
              <Image
                alt="24x7 Support"
                className="w-8 h-8 object-contain rounded-full"
                src="/support.png"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">
                24×7 Customer Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our round-the-clock support team is always available to guide,
                assist, and resolve your concerns instantly.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex gap-5" data-purpose="pillar-item">
            <div className="flex-shrink-0 w-12 h-12 bg-[#fffbeb] rounded-full flex items-center justify-center">
              <Image
                alt="Transparent Pricing"
                className="w-8 h-8 object-contain rounded-full"
                src="/pricing.png"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">
                Transparent & Honest Pricing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We believe families deserve clarity, not surprises. Every
                service comes with clear, upfront pricing and zero hidden
                charges.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2" data-purpose="stats-grid">
          {/* Stat 1: Patients Served */}
          <div className="p-4 sm:p-8 md:p-12 border-r border-b border-gray-200 flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-[#1a1a1a]">
              20,000+
            </span>
            <p className="text-gray-500 text-sm md:text-base leading-snug">
              patients served in last one year
            </p>
          </div>
          {/* Stat 2: Arrival Time */}
          <div className="p-4 sm:p-8 md:p-12 border-b border-gray-200 flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-[#1a1a1a]">
              30 Min
            </span>
            <p className="text-gray-500 text-sm md:text-base leading-snug">
              Avg time for care arrival at home
            </p>
          </div>
          {/* Stat 3: Rating */}
          <div className="p-4 sm:p-8 md:p-12 border-r border-gray-200 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a1a]">
                4.8 ⭐
              </span>
            </div>
            <p className="text-gray-500 text-sm md:text-base leading-snug">
              Avg google rating from 1000+ reviews
            </p>
          </div>
          {/* Stat 4: Reduction */}
          <div className="p-4 sm:p-8 md:p-12 border-gray-200 flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-[#1a1a1a]">
              65%
            </span>
            <p className="text-gray-500 text-sm md:text-base leading-snug">
              reduction in hospital visits with Tez Health Services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
