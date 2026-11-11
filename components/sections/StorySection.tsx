"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { useLanguage } from "@/lib/language-context";

export function StorySection() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="about"
      className="relative py-24 px-4 overflow-hidden bg-white"
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
            className="text-xs font-inria tracking-[0.35em] uppercase font-semibold block mb-2"
            style={{ color: "#cda757" }}
          >
            {t.heritageSubtitle}
          </span>
          <h2
            className="text-4xl sm:text-5xl font-inria font-bold"
            style={{ color: "#4a0101" }}
          >
            {t.heritageTitle}
          </h2>
          <NakasiDivider color="gold" />
        </motion.div>

        {/* Asymmetrical Editorial 2-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Text Column */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="font-inria text-xl sm:text-2xl leading-snug italic mb-6 border-l-2 pl-4"
              style={{ color: "#4a0101", borderColor: "#cda757" }}
            >
              &ldquo;{t.storyQuote}&rdquo;
            </p>

            <p className="font-nunito text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
              {t.storyP1}
            </p>

            <p className="font-nunito text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
              {t.storyP2}
            </p>

            <div className="flex flex-wrap gap-4">
              <RoyalButton href="/about" variant="outline">
                {t.readFullStoryBtn}
              </RoyalButton>
              <RoyalButton
                href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                external
                variant="gold"
              >
                {t.reserveTable}
              </RoyalButton>
            </div>
          </motion.div>

          {/* Right Image Frame */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative border-2 p-2 shadow-2xl"
              style={{ borderColor: "#cda757", backgroundColor: "#4a0101" }}
            >
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden">
                <Image
                  src="/images/4-1370x550.jpg"
                  alt="Maharaja The Royals dining hall"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div
                className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 border p-4 shadow-xl z-20 max-w-[220px]"
                style={{ backgroundColor: "#4a0101", borderColor: "#cda757" }}
              >
                <p
                  className="text-[10px] font-cinzel tracking-widest uppercase mb-1"
                  style={{ color: "#cda757" }}
                >
                  {t.exclusiveOutlet}
                </p>
                <p className="text-white font-cinzel text-sm font-bold">
                  Akazienstraße 85, Dortmund
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Clean Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            {
              value: "100+",
              label: lang === "de" ? "Köstliche Spezialitäten" : "Menu Specialities",
            },
            {
              value: "100%",
              label: lang === "de" ? "Frisch gemahlene Gewürze" : "Fresh Hand-Ground Spices",
            },
            {
              value: "1",
              label: lang === "de" ? "Exklusiver Standort Dortmund" : "Exclusive Dortmund Outlet",
            },
            {
              value: "15:00",
              label: lang === "de" ? "Öffnung Abendservice" : "Dinner Service Opens",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-white border shadow-sm transition-colors"
              style={{ borderColor: "rgba(205, 167, 87, 0.35)" }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold font-cinzel mb-1"
                style={{ color: "#4a0101" }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-cinzel uppercase tracking-wider text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
