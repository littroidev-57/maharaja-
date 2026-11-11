"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { useLanguage } from "@/lib/language-context";
import { VegIcon, VeganIcon, NonVegIcon } from "@/components/ui/Icons";

export type FavouriteDish = {
  id: string;
  name: string;
  nameDE: string;
  description: string;
  descriptionDE: string;
  price: number;
  image: string;
  dietary: "veg" | "vegan" | "non-veg";
  badgeDE: string;
  badgeEN: string;
  spice: "mild" | "medium" | "hot";
};

// Hand-curated Royal Guest Favorites
const FAVOURITE_DISHES: FavouriteDish[] = [
  {
    id: "butter-chicken",
    name: "Butter Chicken Emperor",
    nameDE: "Butter Chicken Emperor",
    description: "Tender chicken breast simmered in rich creamy tomato and butter sauce with aromatic fenugreek.",
    descriptionDE: "Zarte Hähnchenbrust in feiner Tomaten-Buttersauce mit Sahne und aromatischem Bockshornklee.",
    price: 16.90,
    image: "/images/food-chicken.jpg",
    dietary: "non-veg",
    badgeDE: "Bestseller",
    badgeEN: "Bestseller",
    spice: "mild",
  },
  {
    id: "tandoori-chicken",
    name: "Tandoori Chicken Royale",
    nameDE: "Tandoori Hähnchen Royal",
    description: "Half chicken marinated 24h in spiced yogurt, charcoal-roasted at 400°C in an authentic clay tandoor.",
    descriptionDE: "24h mariniertes Hähnchen mit Safran-Joghurt, über Holzkohle im originalen Lehmofen saftig gegrillt.",
    price: 17.50,
    image: "/images/ai-food-tandoori.jpg",
    dietary: "non-veg",
    badgeDE: "Palast-Klassiker",
    badgeEN: "Palace Classic",
    spice: "medium",
  },
  {
    id: "shahi-paneer",
    name: "Shahi Paneer Gold",
    nameDE: "Shahi Paneer Gold",
    description: "Homemade Indian cottage cheese cubes in a velvety cashew and tomato gravy with royal green cardamom.",
    descriptionDE: "Hausgemachter indischer Frischkäse in samtiger Cashew-Tomatensauce mit grünem Kardamom.",
    price: 15.50,
    image: "/images/food-paneer.jpg",
    dietary: "veg",
    badgeDE: "Veg Favorit",
    badgeEN: "Veg Favorite",
    spice: "mild",
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani Royale",
    nameDE: "Chicken Biryani Royale",
    description: "Fragrant basmati rice slow-dum-cooked with tender chicken, Kashmiri saffron, cloves, and roasted nuts.",
    descriptionDE: "Gedämpfter Basmatireis mit zartem Hähnchen, Safran, Nelken, gerösteten Nüssen und feinem Raita.",
    price: 17.90,
    image: "/images/food-biryani.jpg",
    dietary: "non-veg",
    badgeDE: "Safran-Spezialität",
    badgeEN: "Saffron Specialty",
    spice: "medium",
  },
  {
    id: "lamb-rogan-josh",
    name: "Imperial Lamb Rogan Josh",
    nameDE: "Imperial Lamm Rogan Josh",
    description: "Slow-braised tender lamb simmered in an aromatic Kashmiri spiced gravy with caramelized onions.",
    descriptionDE: "Schonend geschmortes Lammfleisch in reichhaltiger Kashmiri-Masalasauce und erlesenen Kräutern.",
    price: 18.50,
    image: "/images/ai-food-lamb.jpg",
    dietary: "non-veg",
    badgeDE: "Chef-Empfehlung",
    badgeEN: "Chef's Pick",
    spice: "medium",
  },
  {
    id: "delhi-samosa",
    name: "Delhi Street Samosa (2 pcs)",
    nameDE: "Delhi Street Samosa (2 Stk.)",
    description: "Crispy hand-folded pastries filled with spiced potatoes, green peas, served with mint & tamarind relish.",
    descriptionDE: "Knusprige goldene Teigtaschen gefüllt mit gewürzten Kartoffeln und Erbsen, dazu edle Chutneys.",
    price: 6.90,
    image: "/images/food-samosa.jpg",
    dietary: "vegan",
    badgeDE: "Street Food Star",
    badgeEN: "Street Food Star",
    spice: "mild",
  },
  {
    id: "garlic-naan",
    name: "Garlic & Butter Naan",
    nameDE: "Knoblauch- & Butter-Naan",
    description: "Freshly baked tandoori flatbread brushed with pure clarified butter, roasted garlic, and coriander.",
    descriptionDE: "Ofenfrisches Fladenbrot aus dem Tandoor mit geschmolzener Butter, Knoblauch und Koriander.",
    price: 4.50,
    image: "/images/ai-food-naan.jpg",
    dietary: "veg",
    badgeDE: "Aus dem Lehmofen",
    badgeEN: "From the Clay Oven",
    spice: "mild",
  },
  {
    id: "goa-prawns",
    name: "Goa Coastal King Prawns",
    nameDE: "Goa Riesengarnelen-Curry",
    description: "Succulent king prawns simmered in coastal coconut milk with mustard seeds, curry leaves, and tamarind.",
    descriptionDE: "Saftige Riesengarnelen in aromatischer Kokossauce nach Küstenart mit Senfkörnern und Tamarinde.",
    price: 19.50,
    image: "/images/food-seafood.jpg",
    dietary: "non-veg",
    badgeDE: "Küstenspezialität",
    badgeEN: "Coastal Seafood",
    spice: "medium",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun & Kulfi Royale",
    nameDE: "Königliche Gulab Jamun & Kulfi",
    description: "Warm syrup-soaked golden dumplings accompanied by house-churned pistachio-saffron kulfi.",
    descriptionDE: "Warme Teigbällchen in Rosen-Kardamomsirup mit hausgemachtem Pistazien-Safran-Kulfi-Eis.",
    price: 6.90,
    image: "/images/food-dessert.jpg",
    dietary: "veg",
    badgeDE: "Königlicher Dessert",
    badgeEN: "Royal Dessert",
    spice: "mild",
  },
  {
    id: "mango-lassi",
    name: "Royal Mango Lassi",
    nameDE: "Königliches Mango Lassi",
    description: "Velvety Alphonso mango puree blended with chilled natural yogurt, green cardamom, and rose water.",
    descriptionDE: "Cremiges Joghurtgetränk mit sonnengereiftem Alphonso-Mango, Kardamom und feinem Rosenwasser.",
    price: 4.90,
    image: "/images/ai-food-drink.jpg",
    dietary: "veg",
    badgeDE: "Erfrischung",
    badgeEN: "Refreshing",
    spice: "mild",
  },
];

export function MenuPreview() {
  const { lang, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  // Triple array for seamless infinite marquee loop
  const marqueeDishes = [...FAVOURITE_DISHES, ...FAVOURITE_DISHES, ...FAVOURITE_DISHES];

  return (
    <section
      id="menu"
      className="relative py-24 bg-[#4a0101] text-white overflow-hidden"
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

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-inria tracking-[0.35em] uppercase font-semibold block mb-2"
            style={{ color: "#cda757" }}
          >
            {lang === "de" ? "KÖNIGLICHE LIEBLINGSGERICHTE" : "ROYAL FAVOURITE DISHES"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inria font-bold text-white tracking-tight">
            {lang === "de" ? "Die Beliebtesten Spezialitäten" : "Guest Favourite Specialties"}
          </h2>
          <NakasiDivider color="gold" />
          <p className="text-white/85 text-base sm:text-lg font-nunito font-normal max-w-2xl mx-auto leading-relaxed">
            {lang === "de"
              ? "Lassen Sie sich von unseren meistbestellten Palastgerichten verführen – über Holzkohle im Lehmofen gegrillt, langsam geschmort und meisterhaft gewürzt."
              : "Discover our most celebrated imperial dishes — charcoal roasted in the clay tandoor, slow-braised, and richly infused with regal spices."}
          </p>
        </motion.div>

        {/* Dietary Legend / Key (Centered) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 mb-8 py-2.5 px-6 rounded-full bg-black/40 border border-[#cda757]/30 max-w-fit mx-auto backdrop-blur-md">
          <span className="text-[11px] uppercase tracking-wider text-[#cda757] font-semibold font-inria">
            {lang === "de" ? "Kennzeichnung:" : "Key:"}
          </span>
          <div className="flex items-center gap-2 text-xs font-inria tracking-wider text-white/95">
            <VegIcon className="w-4 h-4 flex-shrink-0" />
            <span>{lang === "de" ? "Vegetarisch" : "Vegetarian"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-inria tracking-wider text-white/95">
            <VeganIcon className="w-4 h-4 flex-shrink-0" />
            <span>{lang === "de" ? "Vegan" : "Vegan"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-inria tracking-wider text-white/95">
            <NonVegIcon className="w-4 h-4 flex-shrink-0" />
            <span>{lang === "de" ? "Nicht-Vegetarisch" : "Non-Vegetarian"}</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INFINITE MARQUEE CAROUSEL (PAUSES ON HOVER / TOUCH)         */}
      {/* ============================================================ */}
      <div
        className="relative w-full overflow-hidden py-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Subtle Fade Edges for smooth luxury reveal */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#4a0101] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#4a0101] to-transparent z-20 pointer-events-none" />

        <div
          className={`animate-marquee-infinite ${isHovered ? "marquee-paused" : ""}`}
          style={{ animationDuration: "50s" }}
        >
          {marqueeDishes.map((dish, idx) => (
            <div
              key={`${dish.id}-${idx}`}
              className="w-[290px] sm:w-[330px] md:w-[360px] flex-shrink-0 px-3 flex py-3"
            >
              <div className="w-full bg-[#350101] rounded-2xl border border-[#cda757]/35 hover:border-[#f7b800] shadow-2xl overflow-hidden flex flex-col justify-between group/card transition-all duration-500 ease-out hover:scale-[1.04] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(205,167,87,0.35)] relative cursor-pointer">
                {/* Dish Image Banner with Zoom-In */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black">
                  <Image
                    src={dish.image}
                    alt={lang === "de" ? dish.nameDE : dish.name}
                    fill
                    sizes="360px"
                    className="object-cover group-hover/card:scale-115 transition-transform duration-700 ease-out brightness-[0.93] group-hover/card:brightness-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#350101] via-transparent to-black/35 pointer-events-none" />

                  {/* Top-Left: ONLY the Official Dietary Icon with Micro-Bounce */}
                  <div className="absolute top-3 left-3 z-10 transition-transform duration-300 group-hover/card:scale-115">
                    {dish.dietary === "veg" && (
                      <VegIcon size={20} className="shadow-lg rounded" />
                    )}
                    {dish.dietary === "vegan" && (
                      <VeganIcon size={20} className="shadow-lg rounded" />
                    )}
                    {dish.dietary === "non-veg" && (
                      <NonVegIcon size={20} className="shadow-lg rounded" />
                    )}
                  </div>

                  {/* Top-Right: Royal Gold Price Badge with Glow */}
                  <div className="absolute top-3 right-3 z-10 transition-transform duration-300 group-hover/card:scale-105">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7b800] to-[#cda757] text-[#260000] font-inria font-extrabold text-sm shadow-xl border border-white/40 tracking-tight flex items-center gap-0.5 group-hover/card:shadow-[0_0_15px_rgba(247,184,0,0.6)]">
                      <span>€</span>
                      <span>{dish.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Bottom Banner on Image: Badge & Star Rating */}
                  <div className="absolute bottom-2.5 inset-x-3 z-10 flex items-center justify-between text-xs pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[#f7b800] text-[10px] font-inria uppercase tracking-wider font-semibold border border-[#cda757]/30 shadow-sm transition-colors group-hover/card:border-[#f7b800] group-hover/card:text-white">
                      {lang === "de" ? dish.badgeDE : dish.badgeEN}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[#f7b800] text-[10px] font-inria font-bold border border-white/15">
                      ★ 4.9
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-inria text-lg sm:text-xl font-bold text-white group-hover/card:text-[#f7b800] transition-colors duration-300 leading-snug line-clamp-1 mb-1">
                      {lang === "de" ? dish.nameDE : dish.name}
                    </h3>

                    {dish.nameDE && dish.name && (
                      <p className="text-[11px] text-[#cda757]/80 font-nunito italic mb-2 line-clamp-1">
                        {lang === "de" ? dish.name : dish.nameDE}
                      </p>
                    )}

                    <p className="font-nunito text-xs sm:text-[13px] text-white/80 leading-relaxed line-clamp-2">
                      {lang === "de" ? dish.descriptionDE : dish.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="max-w-6xl mx-auto px-4 mt-12 text-center flex flex-wrap justify-center gap-3 relative z-10">
        <RoyalButton href="/menu" variant="gold" size="lg">
          {lang === "de" ? "Komplette Speisekarte ansehen" : "Explore Full Menu"} →
        </RoyalButton>
        <RoyalButton
          href="https://reservations.allo.restaurant/de/maharaja-the-royals"
          external
          variant="outline"
          size="lg"
        >
          {t.reserveTable}
        </RoyalButton>
      </div>
    </section>
  );
}
