"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { galleryImages } from "@/lib/gallery-data";
import { useLanguage } from "@/lib/language-context";

export default function GalleryPage() {
  const { lang, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "interior" | "exterior" | "ambience">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = galleryImages.filter((img) => {
    if (selectedFilter === "all") return true;
    return img.category === selectedFilter;
  });

  const slides = filteredImages.map((img) => ({
    src: img.src,
    alt: lang === "de" && img.altDE ? img.altDE : img.alt,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24 px-4 bg-white text-[#4a0101]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="tracking-[0.4em] uppercase text-xs mb-3 font-inria font-semibold"
            style={{ color: "#cda757" }}
          >
            {t.galleryPageSubtitle}
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold mb-4 font-inria tracking-tight"
            style={{ color: "#4a0101" }}
          >
            {t.galleryPageTitle}
          </h1>
          <NakasiDivider color="gold" />
          <p className="text-gray-700 text-base sm:text-lg font-nunito font-normal max-w-2xl mx-auto leading-relaxed">
            {t.galleryPageDesc}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(
            [
              { key: "all", label: t.galleryFilterAll },
              { key: "interior", label: t.galleryFilterInterior },
              { key: "exterior", label: t.galleryFilterExterior },
              { key: "ambience", label: t.galleryFilterAmbience },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-5 py-2 text-xs font-inria uppercase tracking-widest transition-all duration-300 rounded-full hover:scale-105 active:scale-95 ${
                selectedFilter === filter.key
                  ? "bg-[#f7b800] text-[#4a0101] border-2 border-[#f7b800] font-bold shadow-md shadow-[#f7b800]/30"
                  : "bg-white text-[#4a0101] border border-[#f7b800]/40 hover:border-[#f7b800] hover:shadow-[0_0_15px_rgba(247,184,0,0.25)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Layout with Mixed Aspect Ratios */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer transition-all duration-300 shadow-md"
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                {/* Hover overlay with badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a0101]/95 via-[#4a0101]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span
                    className="text-[10px] uppercase tracking-widest font-cinzel mb-1"
                    style={{ color: "#cda757" }}
                  >
                    {img.category === "interior"
                      ? t.galleryFilterInterior
                      : img.category === "exterior"
                      ? t.galleryFilterExterior
                      : img.category === "ambience"
                      ? t.galleryFilterAmbience
                      : "Maharaja"}
                  </span>
                  <p className="font-cormorant text-sm text-white italic line-clamp-2">
                    {lang === "de" && img.altDE ? img.altDE : img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Booking strip */}
        <NakasiCard size="xs" className="mt-16 text-center">
          <h2
            className="text-2xl sm:text-3xl font-cinzel mb-3"
            style={{ color: "#cda757" }}
          >
            {lang === "de" ? "Erleben Sie das Ambiente persönlich" : "Experience the Ambience in Person"}
          </h2>
          <p className="font-cormorant text-white/80 text-lg max-w-xl mx-auto mb-6 italic">
            {t.hospitalityDesc}
          </p>
          <RoyalButton
            href="https://reservations.allo.restaurant/de/maharaja-the-royals"
            external
            variant="gold"
            size="lg"
          >
            {t.reserveTable}
          </RoyalButton>
        </NakasiCard>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(74, 1, 1, 0.98)" },
        }}
      />
    </div>
  );
}
