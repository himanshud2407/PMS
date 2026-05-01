/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import HonorsBanner from '../components/HonorsBanner';
import MarqueeSection from '../components/MarqueeSection';
import HashScrollHandler from '../components/HashScrollHandler';

// Lazy load heavy sections below the fold
const AboutSection = dynamic(() => import('../components/AboutSection'), { 
  loading: () => <div id="home" className="h-screen bg-gray-50 animate-pulse" />,
  ssr: true 
});
const ServicesSection = dynamic(() => import('../components/ServicesSection'), { ssr: true });
const TeamSection = dynamic(() => import('../components/TeamSection'), { ssr: true });
const AdvantagesSection = dynamic(() => import('../components/AdvantagesSection'), { ssr: true });
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), { ssr: true });
const BlogSection = dynamic(() => import('../components/BlogSection'), { ssr: true });
const FAQSection = dynamic(() => import('../components/FAQSection'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HashScrollHandler />
      <main>
        <Hero />
        <HonorsBanner />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
      </main>
    </div>
  );
}
