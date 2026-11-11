"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NakasiCorner } from "@/components/ui/NakasiCorner";
import { heroImages } from "@/lib/gallery-data";
import { useLanguage } from "@/lib/language-context";

export function HeroCarousel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const next = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent((p) => (p + 1) % heroImages.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#4a0101]"
      style={{ height: "100svh", minHeight: 640 }}
    >
      {/* Background Carousel Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[current].src}
            alt={heroImages[current].alt}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Ambient Overlay - Keeps center view clear while enhancing edge text contrast */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(20,0,0,0.45) 70%, rgba(10,0,0,0.7) 100%), linear-gradient(180deg, rgba(74,1,1,0.5) 0%, transparent 20%, transparent 80%, rgba(74,1,1,0.75) 100%)",
        }}
      />

      {/* Subtle Bottom Corner Accents in #cda757 */}
      <div
        className="absolute bottom-4 left-4 z-20 pointer-events-none opacity-60 hidden sm:block"
        style={{ position: "absolute", bottom: "1rem", left: "1rem" }}
      >
        <NakasiCorner corner="bottom-left" size="sm" />
      </div>
      <div
        className="absolute bottom-4 right-4 z-20 pointer-events-none opacity-60 hidden sm:block"
        style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
      >
        <NakasiCorner corner="bottom-right" size="sm" />
      </div>

      {/* Left Side: "MAHARAJA THE ROYALS" Vertical Column */}
      <div className="absolute inset-y-0 left-6 sm:left-10 lg:left-16 z-20 flex items-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-3 sm:gap-4 md:gap-5"
        >
          {/* Column 1: MAHARAJA */}
          <div
            className="font-inria text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] whitespace-nowrap leading-none"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            MAHARAJA
          </div>

          {/* Column 2: THE ROYALS + Vertical Line */}
          <div
            className="flex items-center gap-3 whitespace-nowrap leading-none"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            <div className="w-[1.5px] h-10 sm:h-16 md:h-20 bg-gradient-to-t from-transparent via-[#cda757] to-[#cda757] opacity-85" />
            <span className="font-inria text-[10px] sm:text-xs md:text-sm tracking-[0.45em] uppercase text-[#cda757] font-semibold drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
              THE ROYALS
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Interactive Vertical Sliding Arrow Pill Button (Details.so / Filter Design) */}
      <div className="absolute inset-y-0 right-6 sm:right-10 lg:right-16 z-20 flex items-center select-none">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.a
            href="https://reservations.allo.restaurant/de/maharaja-the-royals"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            animate={{
              backgroundColor: isBtnHovered ? "#cda757" : "rgba(42, 0, 0, 0.92)",
              borderColor: isBtnHovered ? "#dfc384" : "rgba(205, 167, 87, 0.6)",
              boxShadow: isBtnHovered
                ? "0 14px 45px rgba(205, 167, 87, 0.55)"
                : "0 10px 35px rgba(0, 0, 0, 0.65)",
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[50px] sm:w-[54px] h-[224px] rounded-full border cursor-pointer overflow-hidden backdrop-blur-md block"
          >
            {/* Sliding Circle Arrow Badge (Slides from Down to Up on Hover) */}
            <motion.div
              animate={{
                y: isBtnHovered ? 10 : 178,
                backgroundColor: isBtnHovered ? "#4a0101" : "#cda757",
                color: isBtnHovered ? "#cda757" : "#4a0101",
                scale: isBtnHovered ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              className="absolute left-1.5 sm:left-2 w-[36px] sm:w-[38px] h-[36px] sm:h-[38px] rounded-full flex items-center justify-center shadow-md z-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.div>

            {/* Vertical Button Label Text (Shifts down as circle glides up - ZERO overlap) */}
            <motion.div
              animate={{
                y: isBtnHovered ? 68 : 28,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              className="absolute inset-x-0 h-[124px] flex items-center justify-center pointer-events-none"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              <motion.span
                animate={{
                  color: isBtnHovered ? "#4a0101" : "#ffffff",
                }}
                transition={{ duration: 0.3 }}
                className="font-inria text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
              >
                {t.heroReserveTable}
              </motion.span>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
        }}
      >
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="group py-2 focus:outline-none"
          >
            <div
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 32 : 10,
                background: i === current ? "#cda757" : "rgba(205,167,87,0.35)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
