"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import BookTestModal from "./BookTestModal";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(pathname !== "/");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Force scroll to top on route change to prevent "footer to top" glitches
  useEffect(() => {
    // If there is a hash in the URL, don't force scroll to top
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (path === "/#home") {
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById("home");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // If we are not on the homepage, always show the navbar
      if (pathname !== "/") {
        setIsVisible(true);
        return;
      }

      // The Hero section pins for 600% of the viewport height.
      // We show the navbar only when we've scrolled through most of it.
      if (window.scrollY > window.innerHeight * 5.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        opacity: { duration: 0.3 },
      }}
      className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-7xl mx-auto rounded-b-[2rem] shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Go to home page">
          <img
            src="/nav-logo.png"
            alt="Dr. Baviskar Pathology Lab Logo"
            className="pl-5 pt-2 h-10 rounded-xl"
          />
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-8 font-medium">
        {[
          { name: "Home", path: "/#home" },
          { name: "Tests", path: "/tests" },
          { name: "About Us", path: "/about-us" },
          { name: "Blog", path: "/blog" },
          { name: "Contact Us", path: "/contact" },
        ].map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={(e) => handleNavClick(e, link.path)}
            className={`relative px-3 py-1 transition-all duration-300 hover:text-primary active:scale-95 ${pathname === link.path.split("#")[0] ? "text-primary font-semibold" : "text-on-surface-variant"}`}
          >
            {link.name}
            {pathname === link.path.split("#")[0] && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-[21px] left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(var(--primary-rgb),0.3)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
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
            {[
              { name: "Home", path: "/" },
              { name: "Tests", path: "/tests" },
              { name: "About Us", path: "/about-us" },
              { name: "Blog", path: "/blog" },
              { name: "Contact Us", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`relative text-lg font-semibold py-2 pl-3 border-b border-gray-100 flex items-center justify-between ${pathname === link.path.split("#")[0] ? "text-primary" : "text-dark"}`}
              >
                {link.name}
                {pathname === link.path.split("#")[0] && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full shadow-[2px_0_10px_rgba(var(--primary-rgb),0.3)]"
                  />
                )}
              </Link>
            ))}
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
      <BookTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.nav>
  );
}
