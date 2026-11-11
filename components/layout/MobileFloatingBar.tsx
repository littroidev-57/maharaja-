"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { UtensilsIcon, PhoneIcon, PinIcon, CrownIcon } from "@/components/ui/Icons";

export function MobileFloatingBar() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-md border-t px-3 py-2 flex items-center justify-around shadow-2xl"
      style={{
        backgroundColor: "rgba(74, 1, 1, 0.97)",
        borderColor: "rgba(205, 167, 87, 0.35)",
      }}
    >
      <Link
        href="/menu"
        className="flex flex-col items-center text-center py-1 px-2 hover:text-white transition-colors"
        style={{ color: "#cda757" }}
      >
        <UtensilsIcon className="w-4 h-4 mb-1 text-[#cda757]" />
        <span className="text-[10px] font-inria uppercase tracking-wider font-semibold">
          {t.barMenu}
        </span>
      </Link>

      <a
        href="tel:02315315195"
        className="flex flex-col items-center text-center py-1 px-2 hover:text-white transition-colors"
        style={{ color: "#cda757" }}
      >
        <PhoneIcon className="w-4 h-4 mb-1 text-[#cda757]" />
        <span className="text-[10px] font-inria uppercase tracking-wider font-semibold">
          {t.barCall}
        </span>
      </a>

      <a
        href="https://maps.google.com/?q=Akazienstra%C3%9Fe+85,+44143+Dortmund"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-center py-1 px-2 hover:text-white transition-colors"
        style={{ color: "#cda757" }}
      >
        <PinIcon className="w-4 h-4 mb-1 text-[#cda757]" />
        <span className="text-[10px] font-inria uppercase tracking-wider font-semibold">
          {t.barMap}
        </span>
      </a>

      <a
        href="https://reservations.allo.restaurant/de/maharaja-the-royals"
        target="_blank"
        rel="noopener noreferrer"
        className="font-inria font-bold text-xs uppercase px-3.5 py-2 rounded-sm shadow-md transition-all flex items-center gap-1.5"
        style={{
          backgroundColor: "#cda757",
          color: "#4a0101",
        }}
      >
        <CrownIcon className="w-3.5 h-3.5 text-[#4a0101]" />
        <span>{t.reserveTable}</span>
      </a>
    </div>
  );
}
