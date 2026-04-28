/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8L8 12L12 16L16 12L12 8Z" fill="white"/>
          </svg>
        </div>
        <span className="text-2xl font-bold font-display tracking-tight">Lunira</span>
      </div>

      <div className="hidden lg:flex items-center gap-8 font-medium">
        <a href="#" className="hover:text-primary transition-colors">Home</a>
        <a href="#" className="hover:text-primary transition-colors">About</a>
        <a href="#" className="hover:text-primary transition-colors">Shop</a>
        <a href="#" className="hover:text-primary transition-colors">Blog</a>
        <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
          Pages <ChevronDown size={16} className="group-hover:rotate-180 transition-transform"/>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative group cursor-pointer">
          <ShoppingCart className="text-dark hover:text-primary transition-colors" />
          <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
        </div>
        <button className="hidden sm:block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
          Get Started
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
            <a href="#" className="text-lg font-semibold py-2 border-b border-gray-100">Home</a>
            <a href="#" className="text-lg font-semibold py-2 border-b border-gray-100">About</a>
            <a href="#" className="text-lg font-semibold py-2 border-b border-gray-100">Shop</a>
            <a href="#" className="text-lg font-semibold py-2 border-b border-gray-100">Blog</a>
            <button className="bg-primary text-white py-4 rounded-2xl font-bold mt-4">Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
