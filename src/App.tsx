/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HonorsBanner from './components/HonorsBanner';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TeamSection from './components/TeamSection';
import AdvantagesSection from './components/AdvantagesSection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HonorsBanner />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

