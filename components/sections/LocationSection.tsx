"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { PinIcon, PhoneIcon, MailIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/language-context";

export function LocationSection() {
  const { lang, t } = useLanguage();

  const schedule = [
    { day: lang === "de" ? "Montag" : "Monday", hours: "15:00 – 22:30", open: true },
    { day: lang === "de" ? "Dienstag" : "Tuesday", hours: "15:00 – 22:30", open: true },
    {
      day: lang === "de" ? "Mittwoch" : "Wednesday",
      hours: lang === "de" ? "Geschlossen (Ruhetag)" : "Closed (Rest Day)",
      open: false,
    },
    { day: lang === "de" ? "Donnerstag" : "Thursday", hours: "15:00 – 22:30", open: true },
    { day: lang === "de" ? "Freitag" : "Friday", hours: "15:00 – 22:30", open: true },
    { day: lang === "de" ? "Samstag" : "Saturday", hours: "13:00 – 23:00", open: true },
    { day: lang === "de" ? "Sonntag" : "Sunday", hours: "13:00 – 23:00", open: true },
  ];
  return (
    <section
      id="location"
      className="relative py-24 px-4 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-cinzel tracking-[0.35em] uppercase font-semibold block mb-2"
            style={{ color: "#cda757" }}
          >
            {t.locationSubtitle}
          </span>
          <h2
            className="text-4xl sm:text-5xl font-cinzel font-bold"
            style={{ color: "#4a0101" }}
          >
            {t.locationTitle}
          </h2>
          <NakasiDivider color="gold" />
          <p className="text-gray-700 text-lg font-cormorant italic max-w-xl mx-auto">
            {t.locationDesc}
          </p>
        </motion.div>

        {/* 2-Column Outlet Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Outlet Details Card in #4a0101 */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NakasiCard size="xs" className="h-full flex flex-col justify-between">
              <div>
                <div
                  className="flex items-center justify-between border-b pb-4 mb-6"
                  style={{ borderColor: "rgba(205, 167, 87, 0.3)" }}
                >
                  <div>
                    <span
                      className="text-[10px] font-cinzel uppercase tracking-[0.25em] block mb-1"
                      style={{ color: "#cda757" }}
                    >
                      {t.exclusiveOutlet}
                    </span>
                    <h3 className="text-2xl font-cinzel text-white font-bold">
                      Dortmund
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-cinzel">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t.openToday}
                  </span>
                </div>

                {/* Address & Contacts */}
                <div className="space-y-4 mb-6 text-white/90">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                      <PinIcon className="w-4 h-4 text-[#cda757]" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-inria uppercase tracking-wider mb-0.5 font-semibold"
                        style={{ color: "#cda757" }}
                      >
                        {t.addressLabel}
                      </p>
                      <p className="font-nunito text-base text-white/90">
                        Akazienstraße 85, 44143 Dortmund, Germany
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                      <PhoneIcon className="w-4 h-4 text-[#cda757]" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-inria uppercase tracking-wider mb-0.5 font-semibold"
                        style={{ color: "#cda757" }}
                      >
                        {t.contactPhoneLabel}
                      </p>
                      <a
                        href="tel:02315315195"
                        className="font-nunito text-lg font-semibold text-white hover:underline transition-colors block"
                        style={{ color: "#ffffff" }}
                      >
                        0231 5315195
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                      <MailIcon className="w-4 h-4 text-[#cda757]" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-inria uppercase tracking-wider mb-0.5 font-semibold"
                        style={{ color: "#cda757" }}
                      >
                        {t.contactEmailLabel}
                      </p>
                      <a
                        href="mailto:kontakt@maharajatheroyals.com"
                        className="font-nunito text-base text-white/80 hover:underline transition-colors block"
                      >
                        kontakt@maharajatheroyals.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Opening Hours Table */}
                <div
                  className="border-t pt-4 mb-6"
                  style={{ borderColor: "rgba(205, 167, 87, 0.25)" }}
                >
                  <p
                    className="text-xs font-cinzel uppercase tracking-widest mb-3 font-semibold"
                    style={{ color: "#cda757" }}
                  >
                    {t.openingHours}
                  </p>
                  <div className="space-y-1.5">
                    {schedule.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between items-center text-xs py-1 border-b border-white/5"
                      >
                        <span className="font-cormorant text-sm text-white/85">
                          {item.day}
                        </span>
                        <span
                          className={`font-cinzel tracking-wider ${
                            item.open
                              ? "font-semibold"
                              : "text-red-300 font-semibold"
                          }`}
                          style={{ color: item.open ? "#cda757" : undefined }}
                        >
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <RoyalButton
                  href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                  external
                  variant="gold"
                  size="md"
                  className="w-full"
                >
                  {t.reserveTable}
                </RoyalButton>
                <RoyalButton
                  href="https://maps.google.com/?q=Akazienstra%C3%9Fe+85,+44143+Dortmund"
                  external
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {t.openGoogleMaps}
                </RoyalButton>
              </div>
            </NakasiCard>
          </motion.div>

          {/* Right Column: Google Map & Venue Photos */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Interactive Map */}
            <div
              className="relative h-[360px] sm:h-[400px] w-full border-2 shadow-xl overflow-hidden"
              style={{ borderColor: "#cda757", backgroundColor: "#4a0101" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3!2d7.4890!3d51.5076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI3LjQiTiA3wrAyOScyMC40IkU!5e0!3m2!1sen!2sde!4v1699500000000!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maharaja The Royals Dortmund Location"
                className="grayscale contrast-125"
              />
              <div
                className="absolute top-4 left-4 border px-3 py-1.5 shadow-lg"
                style={{ backgroundColor: "rgba(74, 1, 1, 0.95)", borderColor: "#cda757" }}
              >
                <span
                  className="text-[11px] font-inria uppercase tracking-wider flex items-center gap-1.5 font-semibold"
                  style={{ color: "#cda757" }}
                >
                  <PinIcon className="w-3.5 h-3.5 text-[#cda757]" />
                  Akazienstraße 85 · Dortmund
                </span>
              </div>
            </div>

            {/* Photos Strip */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative h-44 w-full border overflow-hidden group"
                style={{ borderColor: "rgba(205, 167, 87, 0.4)" }}
              >
                <Image
                  src="/images/22-1152x1536.jpg"
                  alt="Maharaja The Royals exterior facade"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-end p-3">
                  <p className="text-white text-xs font-cinzel uppercase tracking-wider">
                    Exterior Facade
                  </p>
                </div>
              </div>
              <div
                className="relative h-44 w-full border overflow-hidden group"
                style={{ borderColor: "rgba(205, 167, 87, 0.4)" }}
              >
                <Image
                  src="/images/hero-maharaja.jpg"
                  alt="Maharaja The Royals dining hall"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-end p-3">
                  <p className="text-white text-xs font-cinzel uppercase tracking-wider">
                    Bar & Dining Room
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
