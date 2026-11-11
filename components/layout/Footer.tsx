"use client";

import Image from "next/image";
import Link from "next/link";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.navHome, href: "/" },
    { label: t.navMenu, href: "/menu" },
    { label: t.navGallery, href: "/gallery" },
    { label: t.navAbout, href: "/about" },
    { label: t.navContact, href: "/contact" },
  ];
  return (
    <footer
      className="relative overflow-hidden pt-16 pb-14 px-4 text-white"
      style={{ backgroundColor: "#2a0000" }}
    >
      {/* Top Gold Border in #cda757 */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #cda757, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="relative w-20 h-20 mb-3"
            style={{ position: "relative", width: 80, height: 80, maxWidth: 80, maxHeight: 80 }}
          >
            <Image
              src="/images/logo.png"
              alt="Maharaja The Royals"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          <p
            className="text-2xl font-bold font-cinzel"
            style={{ color: "#cda757" }}
          >
            Maharaja The Royals
          </p>
          <p
            className="text-xs tracking-[0.35em] uppercase mt-1 text-white/70 font-cinzel"
          >
            {t.footerTagline}
          </p>
        </div>

        <NakasiDivider color="gold" className="my-6" />

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 my-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-widest uppercase transition-colors hover:text-white font-cinzel"
              style={{ color: "#cda757" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social & Contact Shortcuts */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <a
            href="https://www.instagram.com/maharaja.theroyals"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              borderColor: "rgba(205, 167, 87, 0.4)",
              borderWidth: "1px",
              color: "#cda757",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>

          <a
            href="tel:02315315195"
            aria-label="Call us"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              borderColor: "rgba(205, 167, 87, 0.4)",
              borderWidth: "1px",
              color: "#cda757",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="mailto:kontakt@maharajatheroyals.com"
            aria-label="Email"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              borderColor: "rgba(205, 167, 87, 0.4)",
              borderWidth: "1px",
              color: "#cda757",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        {/* Address & Copyright */}
        <div className="text-center pt-4 border-t border-white/10 space-y-1.5">
          <p className="text-white/70 text-sm font-nunito">
            Akazienstraße 85 · 44143 Dortmund · Germany
          </p>
          <p className="text-white/40 text-[11px] font-inria">
            © {new Date().getFullYear()} Restaurant Maharaja The Royals. {t.allRightsReserved}
          </p>
          <p className="text-white/50 text-[11px] font-nunito pt-1">
            Crafted by{" "}
            <a
              href="https://littroi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cda757] hover:underline hover:text-white transition-colors font-medium"
            >
              Littroi Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
