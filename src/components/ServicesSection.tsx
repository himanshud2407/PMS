/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { CardStack } from './ui/card-stack';
import ButtonWithIcon from './ui/button-with-icon';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="services" className="px-4 lg:px-12 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight">
            Expert Healthcare Services <br className="hidden md:block" /> Tailored to Your Well-being
          </h2>
        </div>
        <Link href="/tests" className="w-full md:w-auto">
          <ButtonWithIcon label="See All Services" className="w-auto md:w-auto" />
        </Link>
      </div>

      <div className="relative pt-10 flex justify-center">
        <CardStack 
          items={SERVICES.map(s => ({
            id: s.id,
            title: s.title,
            description: "Advanced diagnostic and treatment solutions specialized for your unique health needs.",
            imageSrc: s.image,
            href: "#"
          }))}
          cardWidth={isMobile ? 290 : 600}
          cardHeight={isMobile ? 420 : 400}
          autoAdvance
          intervalMs={4000}
          overlap={isMobile ? 0.2 : 0.48}
          spreadDeg={isMobile ? 10 : 48}
        />
      </div>
    </section>
  );
}
