import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, Smile, Leaf, ChevronDown, ChevronUp } from 'lucide-react';
import ButtonWithIcon from './ui/button-with-icon';
import { useState } from 'react';
import { DIAGNOSTIC_TESTS } from '../constants';
import BookTestModal from './BookTestModal';

const iconMap: Record<string, any> = {
  Heart,
  Activity,
  Smile,
  Leaf
};

export default function AdvantagesSection() {
  const [showAllTests, setShowAllTests] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialTests = DIAGNOSTIC_TESTS.slice(0, 6);
  const displayTests = showAllTests ? DIAGNOSTIC_TESTS : initialTests;

  return (
    <section id="shop" className="px-4 lg:px-12 py-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Advantage</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-8">
            Maximizing Care Efficiency at Medical Clinics
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-12 leading-relaxed">
            We bring together expert care, modern tools, and patient-focused service to make every visit smooth, efficient, and effective.
          </p>
          <ButtonWithIcon 
            label="Appointment" 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-primary text-white shadow-xl shadow-primary/20"
          />
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bento Card 1: 95% Chart */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-soft rounded-[2.5rem] p-8 col-span-1 border border-transparent hover:border-blue-100 transition-colors shadow-sm hover:shadow-xl hover:shadow-blue-500/5 group/card relative overflow-hidden"
          >
            {/* Background Grid Lines */}
            <div className="absolute inset-x-8 top-8 h-40 flex flex-col justify-between pointer-events-none opacity-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-px bg-blue-300"></div>
              ))}
            </div>

            <div className="flex gap-1.5 h-40 mb-6 items-end relative z-10">
              {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 70, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-100/40 rounded-t-md relative group h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.04 }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary via-blue-500 to-blue-400 rounded-t-md transition-all group-hover:brightness-110"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-dark text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold">
                      {h}%
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-display tracking-tighter group-hover/card:text-primary transition-colors">95%</span>
              <p className="text-sm text-gray-500 font-medium leading-tight">of patients seen within 24 hours.</p>
            </div>
          </motion.div>

          {/* Bento Card 2: 82% Circle */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-soft rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden border border-transparent hover:border-blue-100 transition-colors shadow-sm hover:shadow-xl hover:shadow-blue-500/5 group/card"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(29,104,242,0.2)]">
                <defs>
                  <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1D68F2" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <circle cx="96" cy="96" r="80" fill="none" stroke="#eef2ff" strokeWidth="6" />
                <motion.circle 
                  cx="96" cy="96" r="80" 
                  fill="none" 
                  stroke="url(#circleGradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  strokeDasharray="502.4"
                  initial={{ strokeDashoffset: 502.4 }}
                  whileInView={{ strokeDashoffset: 502.4 * (1 - 0.82) }}
                  transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-bold font-display group-hover/card:scale-110 transition-transform"
                >
                  82%
                </motion.span>
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.2em] px-6 mt-1 leading-tight">
                  Experienced Better <br/> Well-being
                </span>
              </div>
            </div>
            
            {/* Floating Icons with specific animations */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 bg-white shadow-lg p-2.5 rounded-2xl"
            >
              <Smile size={18} className="text-primary" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 left-6 bg-white shadow-lg p-2.5 rounded-2xl"
            >
              <Leaf size={18} className="text-emerald-500" />
            </motion.div>
            
            <motion.div 
              animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-12 left-10 bg-white shadow-lg p-2.5 rounded-2xl"
            >
              <Activity size={18} className="text-cyan-500" />
            </motion.div>
          </motion.div>

          {/* Bento Card 3: Line Chart */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-soft rounded-[2.5rem] p-8 border border-transparent hover:border-blue-100 transition-colors shadow-sm hover:shadow-xl hover:shadow-blue-500/5 group/card"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm font-bold text-dark group-hover/card:text-primary transition-colors">Treatment Effectiveness</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Improvement Index</p>
              </div>
              <span className="text-xs text-gray-400 font-medium">2015 - 2025</span>
            </div>
            
            <div className="relative h-32 mb-4 px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1D68F2" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1D68F2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area Gradient */}
                <motion.path
                  d="M0 100 Q 50 110, 100 80 T 200 40 T 300 10 L 300 100 L 0 100 Z"
                  fill="url(#lineGradient)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                
                <motion.path
                  d="M0 100 Q 50 110, 100 80 T 200 40 T 300 10"
                  fill="none"
                  stroke="#1D68F2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Pulsing Dot */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <circle cx="300" cy="10" r="10" fill="#1D68F2" className="opacity-20 animate-ping" />
                  <circle cx="300" cy="10" r="4" fill="#1D68F2" className="shadow-lg" />
                </motion.g>
              </svg>
              <div className="absolute -top-2 right-0 bg-dark text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg transform translate-y-[-100%]">
                92% Stability
              </div>
            </div>
          </motion.div>

          {/* Bento Card 4: Shop Promo */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2.5rem] p-5 flex gap-5 items-center relative overflow-hidden group/card shadow-xl shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-3 flex-1 relative z-10 aspect-square flex items-center justify-center border border-white/20 shadow-inner"
            >
               <img 
                src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=200" 
                alt="Vitamins" 
                className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
              />
            </motion.div>
            
            <div className="flex-1 pr-2 relative z-10">
              <h4 className="text-white font-display font-bold text-xl leading-tight mb-4 drop-shadow-sm">
                Check out <br/> our multivitamins
              </h4>
              <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
                Shop Now
              </button>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto mt-32">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block"
          >
            Our Test Pricing 
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium mb-6"
          >
            Common Diagnostic Tests
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Get accurate results with our state-of-the-art diagnostic services. Clear pricing with no hidden fees.
          </motion.p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {displayTests.map((test, i) => {
              const Icon = iconMap[test.iconName] || Activity;
              return (
                <motion.div
                  key={test.name}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.6, 
                    delay: showAllTests && i >= 6 ? (i - 6) * 0.1 : 0,
                    type: "spring",
                    stiffness: 120,
                    damping: 18
                  }}
                  whileHover={{ y: -12, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden"
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500"></div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform relative z-10 ${
                    test.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                    test.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                    test.color === 'cyan' ? 'bg-cyan-50 text-cyan-500' :
                    test.color === 'rose' ? 'bg-rose-50 text-rose-500' :
                    test.color === 'indigo' ? 'bg-indigo-50 text-indigo-500' :
                    test.color === 'amber' ? 'bg-amber-50 text-amber-500' :
                    test.color === 'purple' ? 'bg-purple-50 text-purple-500' :
                    test.color === 'red' ? 'bg-red-50 text-red-500' :
                    test.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                    test.color === 'teal' ? 'bg-teal-50 text-teal-500' :
                    'bg-blue-50 text-blue-500'
                  }`}>
                    <Icon size={28} />
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{test.name}</h4>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      {test.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50 relative z-10">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block">Starting from</span>
                      <span className="text-2xl font-bold text-dark group-hover:text-primary transition-colors">{test.price}</span>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gray-soft hover:bg-primary hover:text-white text-dark px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20"
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllTests(!showAllTests)}
            className="flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-dark/20 hover:bg-primary transition-all group"
          >
            {showAllTests ? (
              <>
                Show Less <ChevronUp className="group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                View More Tests <ChevronDown className="group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </motion.button>
        </div>
      </div>
      <BookTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

