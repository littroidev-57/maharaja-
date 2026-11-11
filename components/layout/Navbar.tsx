"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(true);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore tiny bounce jitter on Mac trackpads
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;

      if (currentScrollY <= 40) {
        // At the very top of the page: always show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: t.navHome, href: "/" },
    { label: t.navMenu, href: "/menu" },
    { label: t.navGallery, href: "/gallery" },
    { label: t.navAbout, href: "/about" },
    { label: t.navContact, href: "/contact" },
  ];

  const showNavbar = isVisible || menuOpen;

  return (
    <>
      {/* Floating Centered Rounded Navbar */}
      <div className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.header
          className="pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-300 relative overflow-hidden"
          style={{
            background: "rgba(55, 2, 2, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(205, 167, 87, 0.5)",
            boxShadow:
              "0 16px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(205, 167, 87, 0.18)",
            pointerEvents: showNavbar ? "auto" : "none",
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: showNavbar ? 0 : -140,
            opacity: showNavbar ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Subtle Top Gold Highlight inside the pill */}
          <div
            className="absolute top-0 left-10 right-10 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(205, 167, 87, 0.7), transparent)",
            }}
          />

          <div className="px-5 sm:px-8 flex items-center justify-between h-20 sm:h-22 md:h-24">
            {/* Prominent Maharaja Brand Logo (No extra text, large and crisp) */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cda757] rounded-full p-1 transition-transform"
              aria-label="Maharaja The Royals Home"
            >
              <div
                className="relative flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 72,
                  height: 72,
                  maxWidth: 76,
                  maxHeight: 76,
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Maharaja The Royals"
                  width={76}
                  height={76}
                  priority
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-108"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm lg:text-[15px] tracking-[0.22em] uppercase transition-all duration-200 font-inria relative py-2 ${
                      isActive
                        ? "text-[#cda757] font-bold"
                        : "text-white/85 hover:text-[#cda757] font-medium"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{
                          background: "#cda757",
                          boxShadow: "0 0 10px rgba(205, 167, 87, 0.8)",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher & CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Language Switcher (German first, English second) */}
              <div className="flex items-center bg-[#2a0000]/95 border border-[#f7b800]/50 rounded-full p-1 shadow-inner">
                <button
                  onClick={() => setLang("de")}
                  className={`px-3 py-1 text-xs font-inria tracking-wider uppercase transition-all rounded-full ${
                    lang === "de"
                      ? "bg-[#f7b800] text-[#4a0101] font-bold shadow-sm"
                      : "text-[#f7b800] hover:text-white"
                  }`}
                  aria-label="Deutsch"
                >
                  DE
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 text-xs font-inria tracking-wider uppercase transition-all rounded-full ${
                    lang === "en"
                      ? "bg-[#f7b800] text-[#4a0101] font-bold shadow-sm"
                      : "text-[#f7b800] hover:text-white"
                  }`}
                  aria-label="English"
                >
                  EN
                </button>
              </div>

              {/* Reserve Table Button */}
              <div className="hidden md:block">
                <RoyalButton
                  href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                  external
                  variant="gold"
                  size="md"
                  className="rounded-full !px-6 !py-2.5 text-xs lg:text-sm font-bold tracking-[0.18em]"
                >
                  {t.reserveTable}
                </RoyalButton>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Toggle menu"
              >
                <span
                  className="block h-0.5 w-6 transition-all duration-300"
                  style={{
                    background: "#cda757",
                    transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-0.5 w-6 transition-all duration-300"
                  style={{
                    background: "#cda757",
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-0.5 w-6 transition-all duration-300"
                  style={{
                    background: "#cda757",
                    transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Drawer (Floating rounded card) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.nav
              className="absolute top-26 sm:top-28 right-4 left-4 sm:left-auto sm:w-84 rounded-3xl flex flex-col pt-6 px-6 pb-6 gap-5 bg-[#4a0101] border border-[#cda757]/50 shadow-2xl backdrop-blur-xl"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#cda757]/20">
                <span className="text-xs uppercase font-inria tracking-widest text-[#cda757] font-semibold">
                  Navigation
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white/60 hover:text-white text-xs font-inria uppercase tracking-wider"
                >
                  {t.navClose} ✕
                </button>
              </div>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-widest uppercase transition-colors font-inria flex items-center justify-between py-2 ${
                      isActive
                        ? "text-[#cda757] font-bold"
                        : "text-white/85 hover:text-[#cda757]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cda757]" />
                    )}
                  </Link>
                );
              })}

              <div className="flex items-center justify-between pt-4 border-t border-[#f7b800]/20">
                <span className="text-xs uppercase font-inria text-white/70">{t.navLanguage}:</span>
                <div className="flex items-center bg-[#2a0000] border border-[#f7b800]/40 rounded-full p-0.5">
                  <button
                    onClick={() => setLang("de")}
                    className={`px-3 py-1 text-xs font-inria rounded-full ${
                      lang === "de" ? "bg-[#f7b800] text-[#4a0101] font-bold" : "text-[#f7b800]"
                    }`}
                  >
                    DE
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 text-xs font-inria rounded-full ${
                      lang === "en" ? "bg-[#f7b800] text-[#4a0101] font-bold" : "text-[#f7b800]"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <RoyalButton
                  href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                  external
                  variant="gold"
                  size="md"
                  className="w-full text-center rounded-full"
                >
                  {t.reserveTable}
                </RoyalButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
