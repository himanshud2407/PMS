import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface BookTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookTestModal({ isOpen, onClose }: BookTestModalProps) {
  const [mounted, setMounted] = useState(false);

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
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decorative elements for extra glass effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"></div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-800 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Book a Test</h2>
              <p className="text-gray-800 mb-6">Fill out the form below to schedule your diagnostic test.</p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-600 text-gray-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-600 text-gray-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Select Test</label>
                  <select defaultValue="" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 transition-all appearance-none">
                    <option value="" disabled>Select a test...</option>
                    <option value="blood">Complete Blood Count</option>
                    <option value="lipid">Lipid Profile</option>
                    <option value="sugar">Blood Sugar</option>
                    <option value="thyroid">Thyroid Panel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full mt-6 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Schedule Appointment
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
