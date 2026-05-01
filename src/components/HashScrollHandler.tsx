"use client";

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('#home')) {
      const scrollHandler = () => {
        const element = document.getElementById('home');
        if (element) {
          const top = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      };

      const timer = setTimeout(scrollHandler, 800);
      const timer2 = setTimeout(scrollHandler, 1500);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, []);

  return null;
}
