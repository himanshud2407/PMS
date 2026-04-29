/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import BookTestModal from './BookTestModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The Hero section pins for 600% of the viewport height.
      // We show the navbar only when we've scrolled through most of it.
      if (window.scrollY > window.innerHeight * 5.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-7xl mx-auto rounded-b-[2rem] shadow-sm"
    >
      <div className="flex items-center gap-2">
      <a href="/">
      <img src="/nav-logo.png" alt="Logo" className="pl-5 pt-2 h-10 rounded-xl" />
      </a>

      </div>

      <div className="hidden lg:flex items-center gap-8 font-medium">
        <a href="#home" className="hover:text-primary transition-colors">Home</a>
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#shop" className="hover:text-primary transition-colors">Shop</a>
        <a href="#blog" className="hover:text-primary transition-colors">Blog</a>
      </div>

      <div className="flex items-center gap-4 md:gap-6">

        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          Book a Test
        </button>
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 lg:hidden border border-gray-100"
          >
            <a href="#home" onClick={() => setIsOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Home</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">About</a>
            <a href="#shop" onClick={() => setIsOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Shop</a>
            <a href="#blog" onClick={() => setIsOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Blog</a>
            <button 
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="bg-primary text-white py-4 rounded-2xl font-bold mt-4"
            >
              Book a Test
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <BookTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.nav>
  );
}
