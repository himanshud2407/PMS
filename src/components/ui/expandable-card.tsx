"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 grid place-items-center z-[101] p-4 sm:p-0",
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-[600px] h-fit max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl relative",
                classNameExpanded,
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`}>
                <img
                  src={src}
                  alt={title}
                  className="w-full h-72 object-cover object-center"
                />
              </motion.div>
              
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-primary font-semibold uppercase text-xs tracking-widest mb-1"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-display font-bold text-gray-900 text-3xl"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <button
                    onClick={() => setActive(false)}
                    className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-600 leading-relaxed space-y-4"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "group relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col",
          className,
        )}
      >
        <motion.div layoutId={`image-${title}-${id}`} className="relative h-64 overflow-hidden">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
        
        <div className="p-8 flex flex-col flex-grow">
          <motion.p
            layoutId={`description-${description}-${id}`}
            className="text-primary font-semibold uppercase text-[10px] tracking-[0.2em] mb-2"
          >
            {description}
          </motion.p>
          <motion.h3
            layoutId={`title-${title}-${id}`}
            className="text-2xl font-bold font-display text-gray-900 mb-4 group-hover:text-primary transition-colors"
          >
            {title}
          </motion.h3>
          <div className="w-8 h-0.5 bg-gray-200 group-hover:w-full group-hover:bg-primary transition-all duration-500 mt-auto" />
        </div>
      </motion.div>
    </>
  );
}
