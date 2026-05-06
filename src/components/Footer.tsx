'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ButtonWithIcon from './ui/button-with-icon';
import BookTestModal from './BookTestModal';
import { client } from '@/sanity/lib/client';

export default function Footer() {
  const pathname = usePathname();
  const [tests, setTests] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTests() {
      try {
        const data = await client.fetch(`*[_type == "test"] | order(name asc)[0...5]`);
        setTests(data || []);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    }
    fetchTests();
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const footerLinks = {
    Tests: tests.map(test => ({
      name: test.name,
      href: `/tests/${test.slug?.current || ''}`
    })),
    Product: [
      { name: 'Admissions', href: '#shop' },
      { name: 'Charting', href: '#services' },
      { name: 'Billing', href: '#faq' },
      { name: 'Outcomes', href: '#testimonials' }
    ],
    Company: [
      { name: 'Features', href: '#services' },
      { name: 'Why Dr. Baviskar', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Testimonials', href: '#testimonials' }
    ],
    Support: [
      { name: 'Contact Us', href: 'mailto:info@drbaviskar.com' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ]
  };

  return (
    <section className="bg-white pt-24 pb-12 px-6 lg:px-12">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#f2f9f9] via-[#e0f2f3] to-[#FFFFFF] p-12 md:p-20 text-center border border-primary/10 shadow-sm"
        >
          {/* Logo Icon */}
          <div className="flex justify-center mb-8">
            <a href="/">
              <img
                src="/nav-logo.png"
                alt="Dr. Baviskar Pathology Lab Logo"
                className="scale-50"
              />
            </a>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-8 tracking-tight">
            Book Your Test with{" "}
            <span className="text-primary">Dr. Baviskar</span> today!
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
            {[
              "Customized Setup",
              "Easily switch from old provider",
              "No hidden fees",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <ButtonWithIcon
              label="Book a Demo"
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white shadow-lg shadow-primary/20"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
        {/* Brand & Contact */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-2">
            <img
              src="/nav-logo.png"
              alt="Dr. Baviskar Pathology Lab Logo"
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-4 text-sm text-gray-500 font-medium">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p>
                Shop No 1, Bhalerao Corner, Near Vijay Sales, Rahatani Road,
                Pimple Saudagar, Pune-411027, Maharashtra
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a
                href="mailto:info@drbaviskar.com"
                className="hover:text-primary transition-colors"
              >
                info@drbaviskar.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href="tel:" className="hover:text-primary transition-colors">
                +91-86052 92626
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-primary text-sm font-medium transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
        <p>© 2026 Dr. Baviskar Pathology Lab. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
      <BookTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
