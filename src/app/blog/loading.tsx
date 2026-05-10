import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Header / Hero Skeleton */}
      <div className="bg-dark pt-32 pb-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <Skeleton className="h-8 w-48 rounded-full bg-white/10" />
          </div>
          <div className="space-y-4 mb-8">
            <Skeleton className="h-16 w-3/4 mx-auto bg-white/10" />
            <Skeleton className="h-16 w-1/2 mx-auto bg-white/10" />
          </div>
          <Skeleton className="h-6 w-2/3 mx-auto bg-white/10" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 pb-32">
        {/* Featured Post Card Skeleton */}
        <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-[3.5rem] shadow-2xl overflow-hidden mb-24">
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            <div className="w-full lg:w-1/2 aspect-[16/10] rounded-[2.8rem]">
              <Skeleton className="w-full h-full rounded-[2.8rem]" />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col justify-center py-6 px-4 md:px-8">
              <div className="flex items-center gap-6 mb-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-12 w-full mb-6" />
              <Skeleton className="h-12 w-3/4 mb-6" />
              <div className="space-y-3 mb-10">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                <Skeleton className="h-14 w-48 rounded-full" />
                <div className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="aspect-[4/3] rounded-[2.5rem] mb-8" />
              <div className="px-2 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
