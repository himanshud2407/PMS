"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight, 
  Activity, 
  Heart, 
  Leaf, 
  Smile, 
  Droplet,
  Droplets,
  Bug,
  Flame,
  Beaker,
  Microscope,
  ClipboardList,
  Dna,
  Clock,
  TestTube,
  ShieldPlus,
  FlaskRound,
  ShieldAlert,
  Thermometer,
  Stethoscope,
  FlaskConical,
  TestTubes,
  Baby,
  HeartPulse,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { DIAGNOSTIC_TESTS } from '../../constants';
import { TestBookingModal } from '../../components/TestBookingModal';

const iconMap: Record<string, any> = {
  Activity,
  Droplet,
  Droplets,
  Bug,
  Flame,
  Beaker,
  Microscope,
  ClipboardList,
  Dna,
  Clock,
  TestTube,
  ShieldPlus,
  FlaskRound,
  ShieldAlert,
  Thermometer,
  Stethoscope,
  FlaskConical,
  TestTubes,
  Baby,
  HeartPulse,
  Heart,
  Smile,
  Leaf,
  ShieldCheck
};

const categories = ["All Tests", "Blood Test", "Stool Test", "Plasma Test", "Swab Test", "Urine Test"];

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tests");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | undefined>(undefined);

  const filteredTests = DIAGNOSTIC_TESTS.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Tests" || test.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTests = DIAGNOSTIC_TESTS.filter(t => t.popular).slice(0, 3);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Cinematic Header Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
              Full Diagnostic Catalog
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-dark mb-6 tracking-tight font-bold">
              Precision <span className="text-primary italic">Diagnostic</span> Tests
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
              Browse through our comprehensive range of specialized clinical examinations and laboratory tests, handled with scientific excellence.
            </p>
          </motion.div>

          {/* Premium Search & Filter Bar */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 rounded-full" />
              <div className="relative flex items-center bg-white border border-outline-variant shadow-2xl shadow-gray-200/50 rounded-full p-2 pl-6 overflow-hidden focus-within:border-primary transition-all">
                <Search className="w-5 h-5 text-outline mr-3" />
                <input 
                  type="text" 
                  placeholder="Search for blood tests, profiles, or symptoms..." 
                  className="flex-1 bg-transparent border-none outline-none text-dark py-3 text-lg placeholder:text-outline font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    activeCategory === cat 
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                      : "bg-white text-secondary border-outline-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTests.map((test, index) => {
              const Icon = iconMap[test.iconName] || Activity;
              return (
                <motion.div 
                  layout
                  key={test.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white p-8 rounded-[2.5rem] flex flex-col border border-outline-variant hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden"
                >
                  {test.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-6 py-1 rotate-45 translate-x-6 translate-y-2 shadow-sm">
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-primary/10">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/5 rounded-md border border-primary/10">
                      {test.category}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl text-dark mb-4 group-hover:text-primary transition-colors font-bold leading-tight">
                    {test.name}
                  </h4>
                  <p className="text-secondary leading-relaxed mb-8 line-clamp-3 font-medium">
                    {test.desc}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Price</p>
                      <span className="font-display text-2xl text-dark font-bold">{test.price}</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedTest(test.name); setIsModalOpen(true); }}
                      className="bg-primary text-white px-4 py-2.5 rounded-2xl hover:scale-105 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2 font-bold text-sm"
                    >
                      Book Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6 text-outline">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-display font-bold text-dark mb-2">No tests found</h3>
            <p className="text-secondary text-lg">Try adjusting your filters or search keywords.</p>
            <button 
              onClick={() => { setActiveCategory("All Tests"); setSearchQuery(""); }}
              className="mt-8 text-primary font-bold hover:underline"
            >
              View all diagnostic tests
            </button>
          </motion.div>
        )}

        {/* Custom Test CTA */}
        {!searchQuery && activeCategory === "All Tests" && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group mt-24 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative flex-1 text-center lg:text-left z-10">
              <h3 className="font-display text-4xl md:text-5xl text-white mb-6 font-bold">Can't find a specific test?</h3>
              <p className="text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
                Our laboratory offers over 1,000+ specialized clinical examinations. Reach out to our medical team for a custom diagnostic request or special health packages.
              </p>
            </div>
            <div className="relative z-10">
              <button 
                onClick={() => { setSelectedTest("Custom Diagnostic Request"); setIsModalOpen(true); }}
                className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-xl shadow-primary/30 flex items-center gap-3"
              >
                Request Custom Test
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </section>
      
      <TestBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        testName={selectedTest} 
      />
    </main>
  );
}
