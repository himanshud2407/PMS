"use client";

import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Activity, Calendar, ShieldCheck, Phone } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { DIAGNOSTIC_TESTS } from '../constants';

import { submitToGoogleSheets } from '@/lib/google-sheets';

interface BookTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookTestModal({ isOpen, onClose }: BookTestModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      FullName: formData.get('fullName'),
      Email: formData.get('email'),
      ContactNumber: formData.get('contactNumber'),
      TestType: formData.get('testType'),
      PreferredDate: formData.get('preferredDate'),
    };

    const result = await submitToGoogleSheets(data, 'Bookings');
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-gray-100 p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 md:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Direct Booking</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-display text-dark tracking-tight">Book a Test</h2>
                <p className="text-secondary mt-1 text-sm md:text-base md:mt-2">Schedule your diagnostic with Pune's most trusted laboratory.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="fullName"
                    type="text" 
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl bg-gray-soft border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400 text-dark font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl bg-gray-soft border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400 text-dark font-medium"
                    required
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark ml-1">Contact Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="contactNumber"
                    type="tel" 
                    placeholder="98765 43210"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                    }}
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl bg-gray-soft border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400 text-dark font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Select Test */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark ml-1">Test Type</label>
                  <div className="relative group">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                    <select 
                      name="testType"
                      defaultValue="" 
                      className="w-full pl-12 pr-10 py-3 md:py-4 rounded-2xl bg-gray-soft border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all text-dark font-medium appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select test...</option>
                      {DIAGNOSTIC_TESTS.map((test) => (
                        <option key={test.name} value={test.name}>{test.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark ml-1">Preferred Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                    <input 
                      name="preferredDate"
                      type="date" 
                      className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl bg-gray-soft border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all text-dark font-medium cursor-pointer"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 md:pt-4">
                <button 
                  disabled={isSubmitting || isSuccess}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white py-4 md:py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSuccess ? "Success!" : isSubmitting ? "Processing..." : "Schedule Appointment"}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 md:mt-6 text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-green-500" />
                  Secure & Confidential Testing
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
