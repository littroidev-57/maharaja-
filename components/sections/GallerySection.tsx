"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { galleryImages } from "@/lib/gallery-data";
import { useLanguage } from "@/lib/language-context";

export function GallerySection() {
  const { lang, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const previewImages = galleryImages.slice(0, 8);

  const slides = previewImages.map((img) => ({
    src: img.src,
    alt: lang === "de" && img.altDE ? img.altDE : img.alt,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-inria tracking-[0.35em] uppercase font-semibold block mb-2"
            style={{ color: "#cda757" }}
          >
            {t.ambienceSubtitle}
          </span>
          <h2
            className="text-4xl sm:text-5xl font-inria font-bold tracking-tight"
            style={{ color: "#4a0101" }}
          >
            {t.ambienceTitle}
          </h2>
          <NakasiDivider color="gold" />
          <p className="text-gray-700 text-base sm:text-lg font-nunito font-normal max-w-xl mx-auto leading-relaxed">
            {t.ambienceDesc}
          </p>
        </motion.div>

        {/* Masonry Grid (Mixed Vertical & Horizontal Layout) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 mb-12">
          {previewImages.map((img, i) => (
            <motion.div
              key={img.src}
              className="break-inside-avoid overflow-hidden cursor-pointer transition-all duration-300 group relative shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span
                  className="text-[10px] font-inria font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#cda757" }}
                >
                  {img.orientation === "landscape" ? t.viewHorizontal : t.viewVertical}
                </span>
                <p className="font-nunito text-sm text-white/95 line-clamp-2">
                  {lang === "de" && img.altDE ? img.altDE : img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div className="text-center">
          <RoyalButton href="/gallery" variant="outline" size="md">
            {t.viewGalleryBtn} →
          </RoyalButton>
        </div>
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
    </section>
  );
}
