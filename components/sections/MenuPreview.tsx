"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { menuCategories, type MenuItem, getItemDietaryType } from "@/lib/menu-data";
import { useLanguage } from "@/lib/language-context";
import { DietaryBadge } from "@/components/ui/DietaryBadge";
import { VegIcon, VeganIcon, NonVegIcon } from "@/components/ui/Icons";

const FEATURED_CATS = ["vorspeisen", "tandoori", "chicken", "vegetarisch", "biryani", "cocktails"];

export function MenuPreview() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tandoori");

  const previewCategories = menuCategories.filter((c) =>
    FEATURED_CATS.includes(c.id)
  );

  const activeCategory =
    previewCategories.find((c) => c.id === activeTab) || previewCategories[0];

  const itemsToShow = activeCategory ? activeCategory.items.slice(0, 6) : [];

  return (
    <section
      id="menu"
      className="relative py-24 px-4 bg-[#4a0101] text-white overflow-hidden"
    >
      {/* Background Subtle Texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #cda757 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-inria tracking-[0.35em] uppercase font-semibold block mb-2"
            style={{ color: "#cda757" }}
          >
            {t.cuisineSubtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-inria font-bold text-white tracking-tight">
            {t.cuisineTitle}
          </h2>
          <NakasiDivider color="gold" />
          <p className="text-white/85 text-base sm:text-lg font-nunito font-normal max-w-xl mx-auto leading-relaxed">
            {t.cuisineDesc}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {previewCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            const categoryLabel = lang === "de" ? cat.labelDE : cat.label;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-6 py-2.5 text-xs font-inria uppercase tracking-wider transition-all duration-300 rounded-full border overflow-hidden hover:scale-[1.04] active:scale-[0.98] ${
                  isActive
                    ? "bg-[#f7b800] text-[#4a0101] font-bold border-[#f7b800] shadow-lg shadow-[#f7b800]/30"
                    : "bg-transparent text-white/90 border-[#f7b800]/40 hover:border-[#f7b800] hover:text-[#f7b800] hover:shadow-[0_0_15px_rgba(247,184,0,0.3)]"
                }`}
              >
                <span className="relative z-10">{categoryLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Legend / Brief on top */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 mb-10 py-2 px-5 rounded-full bg-black/25 border border-[#cda757]/30 max-w-fit mx-auto backdrop-blur-sm">
          <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#cda757] font-semibold">
            {lang === "de" ? "Legende:" : "Key:"}
          </span>
          <div className="flex items-center gap-2 text-xs font-inria tracking-wider text-white/95">
            <VegIcon className="w-4 h-4" />
            <span>{lang === "de" ? "Vegetarisch" : "Vegetarian"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-inria tracking-wider text-white/95">
            <VeganIcon className="w-4 h-4" />
            <span>{lang === "de" ? "Vegan" : "Vegan"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-inria tracking-wider text-white/95">
            <NonVegIcon className="w-4 h-4" />
            <span>{lang === "de" ? "Nicht-Vegetarisch" : "Non-Vegetarian"}</span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14"
          >
            {itemsToShow.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white/5 border hover:border-[#cda757] transition-all duration-300 group flex flex-col justify-between"
                style={{ borderColor: "rgba(205, 167, 87, 0.25)" }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {getItemDietaryType(item, activeTab) && (
                        <DietaryBadge
                          type={getItemDietaryType(item, activeTab)!}
                          theme="dark"
                          showLabel={false}
                          lang={lang}
                        />
                      )}
                      <h3
                        className="font-cinzel text-base font-semibold text-white group-hover:text-[#cda757] transition-colors"
                      >
                        {lang === "de" && item.nameDE ? item.nameDE : item.name}
                      </h3>
                    </div>
                    <span
                      className="font-cinzel text-base font-bold flex-shrink-0"
                      style={{ color: "#cda757" }}
                    >
                      €{item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="font-nunito text-sm text-white/75 leading-relaxed font-normal">
                    {lang === "de" && item.descriptionDE ? item.descriptionDE : item.description}
                  </p>
                </div>

                {item.spiceLevel && (
                  <div className="mt-3 pt-2 border-t border-white/10">
                    <span
                      className="text-[10px] font-cinzel uppercase tracking-wider"
                      style={{ color: "#cda757" }}
                    >
                      {lang === "de" ? "Schärfe: " : "Spice level: "}
                      {item.spiceLevel === "mild"
                        ? t.spiceMild
                        : item.spiceLevel === "medium"
                        ? t.spiceMedium
                        : t.spiceHot}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="text-center">
          <RoyalButton href="/menu" variant="gold" size="lg">
            {t.exploreMenuBtn} →
          </RoyalButton>
        </div>
      </div>
    </section>
  );
}
