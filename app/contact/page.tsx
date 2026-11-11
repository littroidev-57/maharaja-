"use client";

import { useState } from "react";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { PinIcon, PhoneIcon, MailIcon, InstagramIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/language-context";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24 px-4 bg-white text-[#4a0101]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="tracking-[0.4em] uppercase text-xs mb-3 font-inria font-semibold"
            style={{ color: "#cda757" }}
          >
            {t.contactPageSubtitle}
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold mb-4 font-inria tracking-tight"
            style={{ color: "#4a0101" }}
          >
            {t.contactPageTitle}
          </h1>
          <NakasiDivider color="gold" />
          <p className="text-gray-700 text-base sm:text-lg font-nunito font-normal max-w-2xl mx-auto leading-relaxed">
            {t.contactPageDesc}
          </p>
        </div>

        {/* Primary Contact & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Details in #4a0101 */}
          <NakasiCard size="xs" className="flex flex-col justify-between">
            <div>
              <h2
                className="text-2xl font-cinzel mb-6 border-b pb-3 font-bold"
                style={{ color: "#cda757", borderColor: "rgba(205, 167, 87, 0.3)" }}
              >
                {t.contactDetailsTitle}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                    <PinIcon className="w-5 h-5 text-[#cda757]" />
                  </div>
                  <div>
                    <h3
                      className="font-inria text-xs uppercase tracking-widest mb-1 font-semibold"
                      style={{ color: "#cda757" }}
                    >
                      {t.addressLabel}
                    </h3>
                    <p className="font-nunito text-base sm:text-lg text-white/90 leading-relaxed">
                      Restaurant Maharaja The Royals<br />
                      Akazienstraße 85<br />
                      44143 Dortmund, Germany, EU
                    </p>
                    <a
                      href="https://maps.google.com/?q=Akazienstra%C3%9Fe+85,+44143+Dortmund"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs font-inria uppercase tracking-wider underline hover:text-white"
                      style={{ color: "#cda757" }}
                    >
                      {t.openGoogleMaps}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                    <PhoneIcon className="w-5 h-5 text-[#cda757]" />
                  </div>
                  <div>
                    <h3
                      className="font-inria text-xs uppercase tracking-widest mb-1 font-semibold"
                      style={{ color: "#cda757" }}
                    >
                      {t.contactPhoneLabel}
                    </h3>
                    <a
                      href="tel:02315315195"
                      className="font-nunito text-lg sm:text-xl text-white hover:text-[#cda757] hover:underline block font-semibold transition-colors"
                    >
                      0231 5315195
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                    <MailIcon className="w-5 h-5 text-[#cda757]" />
                  </div>
                  <div>
                    <h3
                      className="font-inria text-xs uppercase tracking-widest mb-1 font-semibold"
                      style={{ color: "#cda757" }}
                    >
                      {t.contactEmailLabel}
                    </h3>
                    <a
                      href="mailto:kontakt@maharajatheroyals.com"
                      className="font-nunito text-base sm:text-lg text-white/90 hover:underline"
                    >
                      kontakt@maharajatheroyals.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#2a0000] border border-[#cda757]/40 text-[#cda757] flex-shrink-0 mt-0.5">
                    <InstagramIcon className="w-5 h-5 text-[#cda757]" />
                  </div>
                  <div>
                    <h3
                      className="font-inria text-xs uppercase tracking-widest mb-1 font-semibold"
                      style={{ color: "#cda757" }}
                    >
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/maharaja.theroyals"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-nunito text-base sm:text-lg text-white hover:text-[#cda757] hover:underline transition-colors"
                    >
                      @maharaja.theroyals
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-8 pt-6 border-t"
              style={{ borderColor: "rgba(205, 167, 87, 0.3)" }}
            >
              <RoyalButton
                href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                external
                variant="gold"
                size="md"
                className="w-full"
              >
                {t.bookOnlineBtn}
              </RoyalButton>
            </div>
          </NakasiCard>

          {/* Card 2: Hours & Instant Reservation */}
          <div
            className="bg-white p-8 border shadow-sm flex flex-col justify-between"
            style={{ borderColor: "rgba(205, 167, 87, 0.4)" }}
          >
            <div>
              <h2
                className="text-2xl font-cinzel mb-6 border-b pb-3 font-bold"
                style={{ color: "#4a0101", borderColor: "rgba(205, 167, 87, 0.3)" }}
              >
                {t.contactHoursTitle}
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className="font-cormorant text-lg font-semibold"
                    style={{ color: "#4a0101" }}
                  >
                    {t.monTue}
                  </span>
                  <span className="font-cinzel text-sm text-gray-700">
                    15:00 – 22:30
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-red-50/50 px-2 rounded">
                  <span className="font-cormorant text-lg font-semibold text-red-800">
                    {lang === "de" ? "Mittwoch" : "Wednesday"}
                  </span>
                  <span className="font-cinzel text-xs tracking-widest uppercase font-bold text-red-700">
                    {lang === "de" ? "Geschlossen (Ruhetag)" : "Closed (Rest Day)"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className="font-cormorant text-lg font-semibold"
                    style={{ color: "#4a0101" }}
                  >
                    {t.thuFri}
                  </span>
                  <span className="font-cinzel text-sm text-gray-700">
                    15:00 – 22:30
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className="font-cormorant text-lg font-semibold"
                    style={{ color: "#4a0101" }}
                  >
                    {t.satSun}
                  </span>
                  <span className="font-cinzel text-sm text-gray-700">
                    13:00 – 23:00
                  </span>
                </div>
              </div>
            </div>

            <div
              className="p-6 border text-center"
              style={{ backgroundColor: "#f9f4e8", borderColor: "rgba(205, 167, 87, 0.4)" }}
            >
              <h3
                className="font-cinzel text-base font-bold mb-2"
                style={{ color: "#4a0101" }}
              >
                {lang === "de" ? "Hinweis zur Tischreservierung" : "Table Reservation Note"}
              </h3>
              <p className="font-cormorant text-sm text-gray-700 italic mb-4">
                {lang === "de"
                  ? "Für Wochenendabende und Gruppen ab 8 Personen empfehlen wir eine frühzeitige Reservierung."
                  : "For weekend evenings and parties larger than 8 guests, early booking is recommended."}
              </p>
              <RoyalButton
                href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                external
                variant="outline"
                size="md"
                className="w-full"
              >
                {t.bookOnlineBtn}
              </RoyalButton>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div
          className="border-2 p-2 shadow-xl"
          style={{ borderColor: "#cda757", backgroundColor: "#4a0101" }}
        >
          <div className="relative h-96 w-full overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3!2d7.4890!3d51.5076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI3LjQiTiA3wrAyOScyMC40IkU!5e0!3m2!1sen!2sde!4v1699500000000!5m2!1sen!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maharaja The Royals Dortmund Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
