import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header Section Skeleton */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Skeleton className="h-6 w-40 rounded-full" />
          </div>
          <div className="space-y-4 mb-6">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-16 w-1/2 mx-auto" />
          </div>
          <Skeleton className="h-6 w-2/3 mx-auto mb-16" />

          {/* Search & Filter Bar Skeleton */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-16 w-full rounded-full" />
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section Skeleton */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-outline-variant p-0 overflow-hidden flex flex-col h-[480px]">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
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
      </section>
    </main>
  );
}
