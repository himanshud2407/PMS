"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight, 
  Filter,
  Activity
} from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { TestBookingModal } from '../../components/TestBookingModal';
import { Skeleton } from '../../components/ui/skeleton';
import Link from 'next/link';

const categories = ["All Tests", "Blood Test", "Stool Test", "Plasma Test", "Swab Test", "Urine Test"];

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tests");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | undefined>(undefined);
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTests() {
      try {
        const data = await client.fetch(`*[_type == "test"] | order(name asc)`);
        setTests(data || []);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTests();
  }, []);

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (test.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Tests" || test.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-0 overflow-hidden flex flex-col h-[480px]">
                <div className="h-48">
                  <Skeleton className="w-full h-full rounded-none" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <div className="space-y-3 mb-8">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="w-10 h-10 rounded-xl" />
                      <Skeleton className="w-28 h-10 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTests.map((test, index) => (
                <motion.div 
                  layout
                  key={test._id || test.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-[2.5rem] flex flex-col border border-outline-variant hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden"
                >
                  {/* Image Header */}
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {test.image ? (
                      <img 
                        src={urlFor(test.image).url()} 
                        alt={test.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Activity className="w-12 h-12 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full border border-white/20">
                        {test.category || 'Clinical'}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h4 className="font-display text-2xl text-dark mb-4 group-hover:text-primary transition-colors font-bold leading-tight">
                      {test.name}
                    </h4>
                    <p className="text-secondary leading-relaxed mb-8 line-clamp-3 font-medium">
                      {test.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Price</p>
                        <span className="font-display text-2xl text-dark font-bold">₹{test.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/tests/${test.slug?.current || '#'}`}
                          className="bg-gray-100 text-gray-700 p-2.5 rounded-xl hover:bg-gray-200 transition-all"
                          title="View Details"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => { setSelectedTest(test.name); setIsModalOpen(true); }}
                          className="bg-primary text-white px-6 py-2.5 rounded-xl hover:scale-105 transition-all active:scale-95 shadow-lg shadow-primary/20 font-bold text-sm"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!isLoading && filteredTests.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-outline">
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
        {!isLoading && !searchQuery && activeCategory === "All Tests" && (
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
