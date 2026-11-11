"use client";

import { motion } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { PinIcon, MailIcon, InstagramIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/language-context";

export function ReservationSection() {
  const { t } = useLanguage();
  return (
    <section
      id="reservation"
      className="relative py-24 px-4 bg-[#4a0101] text-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-cinzel tracking-[0.35em] uppercase font-semibold block mb-2"
            style={{ color: "#cda757" }}
          >
            {t.hospitalitySubtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-white mb-4">
            {t.hospitalityTitle}
          </h2>
          <NakasiDivider color="gold" />
          <p className="text-white/80 text-lg font-cormorant italic max-w-xl mx-auto mb-10">
            {t.hospitalityDesc}
          </p>

          {/* Luxury Reservation Card in #4a0101 and #cda757 */}
          <NakasiCard size="xs" className="text-center py-10 px-6 sm:px-12 border-[#cda757]/40">
            <h3
              className="text-2xl sm:text-3xl font-cinzel mb-3 font-semibold"
              style={{ color: "#cda757" }}
            >
              {t.reservationCardTitle}
            </h3>
            <p className="font-cormorant text-white/90 text-base max-w-lg mx-auto mb-8 italic">
              {t.reservationCardDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <RoyalButton
                href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                external
                variant="gold"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.bookOnlineBtn}
              </RoyalButton>
              <RoyalButton
                href="tel:02315315195"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.callUsBtn} (0231 5315195)
              </RoyalButton>
            </div>

            <div
              className="border-t pt-6 flex flex-wrap items-center justify-around gap-4 text-xs font-nunito text-white/80"
              style={{ borderColor: "rgba(205, 167, 87, 0.25)" }}
            >
              <span className="flex items-center gap-2">
                <PinIcon className="w-4 h-4 text-[#cda757]" /> Akazienstraße 85, Dortmund
              </span>
              <span className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-[#cda757]" /> kontakt@maharajatheroyals.com
              </span>
              <span className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-[#cda757]" /> @maharaja.theroyals
              </span>
            </div>
          </NakasiCard>
        </motion.div>
      </div>
    </section>
  );
}
