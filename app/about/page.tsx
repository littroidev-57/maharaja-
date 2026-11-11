"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { CrownIcon, LeafIcon, SparkleIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { lang, t } = useLanguage();
  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24 px-4 bg-white text-[#4a0101]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="tracking-[0.4em] uppercase text-xs mb-3 font-inria font-semibold"
            style={{ color: "#cda757" }}
          >
            {t.aboutPageSubtitle}
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold mb-4 font-inria tracking-tight"
            style={{ color: "#4a0101" }}
          >
            {t.aboutPageTitle}
          </h1>
          <NakasiDivider color="gold" />
          <p className="text-gray-700 text-base sm:text-lg font-nunito font-normal max-w-2xl mx-auto leading-relaxed">
            {t.aboutPageDesc}
          </p>
        </div>

        {/* Hero image of the restaurant */}
        <div
          className="relative mb-14 border-2 p-2 shadow-2xl"
          style={{ borderColor: "#cda757", backgroundColor: "#4a0101" }}
        >
          <div className="relative h-[320px] sm:h-[460px] w-full overflow-hidden">
            <Image
              src="/images/4-1370x550.jpg"
              alt="Dining hall of Maharaja The Royals featuring Maharaja Ranjit Singh portrait"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Story Section 1: The Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-cinzel font-bold mb-4"
              style={{ color: "#4a0101" }}
            >
              {t.aboutVisionTitle}
            </h2>
            <p className="font-cormorant text-lg text-gray-800 leading-relaxed mb-4">
              {t.aboutVisionP1}
            </p>
            <p className="font-cormorant text-lg text-gray-800 leading-relaxed">
              {t.aboutVisionP2}
            </p>
          </div>
          <div
            className="relative border p-2 bg-white shadow-md"
            style={{ borderColor: "rgba(205, 167, 87, 0.4)" }}
          >
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src="/images/hero-maharaja.jpg"
                alt="Ambience and bar counter at Maharaja The Royals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <NakasiDivider color="gold" className="my-12" />

        {/* Story Section 2: Craft & Ingredients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div
            className="order-2 md:order-1 relative border p-2 bg-white shadow-md"
            style={{ borderColor: "rgba(205, 167, 87, 0.4)" }}
          >
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src="/images/22-1152x1536.jpg"
                alt="Exterior of Maharaja The Royals in Dortmund"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2
              className="text-2xl sm:text-3xl font-cinzel font-bold mb-4"
              style={{ color: "#4a0101" }}
            >
              {t.aboutCraftTitle}
            </h2>
            <p className="font-cormorant text-lg text-gray-800 leading-relaxed mb-4">
              {t.aboutCraftP1}
            </p>
            <p className="font-cormorant text-lg text-gray-800 leading-relaxed">
              {t.aboutCraftP2}
            </p>
          </div>
        </div>

        {/* Values pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: t.pillar1Title,
              desc: t.pillar1Desc,
              icon: <CrownIcon className="w-6 h-6 text-[#cda757]" />,
            },
            {
              title: t.pillar2Title,
              desc: t.pillar2Desc,
              icon: <LeafIcon className="w-6 h-6 text-[#cda757]" />,
            },
            {
              title: t.pillar3Title,
              desc: t.pillar3Desc,
              icon: <SparkleIcon className="w-6 h-6 text-[#cda757]" />,
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 bg-white border text-center relative shadow-sm rounded-sm hover:shadow-md transition-shadow"
              style={{ borderColor: "rgba(205, 167, 87, 0.35)" }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#4a0101] flex items-center justify-center border border-[#cda757]/40 shadow-inner">
                {pillar.icon}
              </div>
              <h3
                className="font-inria text-xl font-bold mb-2 tracking-tight"
                style={{ color: "#4a0101" }}
              >
                {pillar.title}
              </h3>
              <p className="font-nunito text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <NakasiCard size="xs" className="text-center">
          <h2
            className="text-2xl sm:text-3xl font-cinzel mb-3"
            style={{ color: "#cda757" }}
          >
            {t.aboutCtaTitle}
          </h2>
          <p className="font-cormorant text-white/80 text-lg max-w-xl mx-auto mb-6 italic">
            {t.aboutCtaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <RoyalButton
              href="https://reservations.allo.restaurant/de/maharaja-the-royals"
              external
              variant="gold"
              size="lg"
            >
              {t.reserveTable}
            </RoyalButton>
            <RoyalButton href="/menu" variant="outline" size="lg">
              {t.viewMenu}
            </RoyalButton>
          </div>
        </NakasiCard>
      </div>
    </div>
  );
}
