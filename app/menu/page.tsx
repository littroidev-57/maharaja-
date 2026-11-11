"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { menuCategories, type MenuItem, getItemDietaryType } from "@/lib/menu-data";
import { useLanguage } from "@/lib/language-context";

// Evocative category descriptions in German and English
const CATEGORY_DESCRIPTIONS: Record<
  string,
  {
    badgeDE: string;
    badgeEN: string;
    descDE: string;
    descEN: string;
  }
> = {
  suppen: {
    badgeDE: "Wärmende Vorspeisen",
    badgeEN: "Warming Soups",
    descDE: "Feine, aromatische Brühen und samtige Linsensuppen, verfeinert mit frischen Kräutern und wärmenden Gewürzen.",
    descEN: "Delicate aromatic broths and velvety lentil soups slow-simmered with royal herbs and warming spices.",
  },
  vorspeisen: {
    badgeDE: "Street Food & Appetithäppchen",
    badgeEN: "Street Food & Starters",
    descDE: "Knusprige Samosas, frisch gebackene Pakoras und pikante Appetithappen nach traditioneller Art.",
    descEN: "Crisp golden samosas, tender spiced pakoras, and savoury street delicacies from across India.",
  },
  vegetarisch: {
    badgeDE: "Königliche Veg-Spezialitäten",
    badgeEN: "Royal Vegetarian Dishes",
    descDE: "Hausgemachter indischer Frischkäse (Paneer), sämige Currysaucen und schonend gegartes Gemüse.",
    descEN: "Homemade Indian cottage cheese (Paneer), velvety slow-simmered gravies, and fresh vegetables.",
  },
  vegan: {
    badgeDE: "100% Rein Pflanzlich",
    badgeEN: "100% Plant-Based",
    descDE: "Herzhafte Curries mit Linsen, Kichererbsen, Kartoffeln und cremiger Kokosmilch – voller Geschmack.",
    descEN: "Rich plant-based curries prepared with fragrant lentils, chickpeas, potatoes, and coconut cream.",
  },
  chicken: {
    badgeDE: "Zarte Hähnchenbrust",
    badgeEN: "Tender Chicken Breast",
    descDE: "Klassiker wie Butter Chicken, aromatisches Tikka Masala und milde Palast-Kormasauce.",
    descEN: "Imperial favourites like Butter Chicken, fragrant Chicken Tikka Masala, and delicate creamy Korma.",
  },
  lamb: {
    badgeDE: "Schonend Geschmortes Lamm",
    badgeEN: "Slow-Braised Lamb",
    descDE: "Zartes Lammfleisch in reichhaltigen Masala-, Korma- und feurigen Rogan Josh-Rezepturen.",
    descEN: "Tender lamb cuts simmered slowly in rich aromatic gravies, Kashmiri rogan josh, and fragrant spices.",
  },
  fisch: {
    badgeDE: "Küste & Meeresfrüchte",
    badgeEN: "Coastal Seafood",
    descDE: "Riesengarnelen und Lachsfilet nach traditionellen Rezepten aus Goa und Kerala mit Kokos und Koriander.",
    descEN: "Succulent king prawns and salmon prepared with fragrant coastal spices, coconut, and tamarind.",
  },
  ente: {
    badgeDE: "Feine Entenbrust",
    badgeEN: "Royal Duck Specialties",
    descDE: "Knusprig gebratene Entenbrustfilets in exotischen Mangosaucen und pikanten Masala-Kreationen.",
    descEN: "Crisp-roasted duck breast bathed in fragrant mango curries and bold palace spices.",
  },
  tandoori: {
    badgeDE: "Holzkohle-Lehmofen",
    badgeEN: "Charcoal Clay Tandoor",
    descDE: "Im originalen Tandoor bei über 400°C über Holzkohle gegrillt – saftig, rauchig und unvergleichlich.",
    descEN: "Charcoal-roasted at 400°C in an authentic clay tandoor — smoky, juicy, and flame-kissed.",
  },
  biryani: {
    badgeDE: "Königliche Safran-Reispfannen",
    badgeEN: "Saffron Basmati Biryani",
    descDE: "Gedämpfter Basmati-Reis mit echtem Safran, Nelken, gerösteten Nüssen und feinsten Gewürzen.",
    descEN: "Aromatic basmati rice layered and slow-dum-cooked with Kashmiri saffron, spices, and roasted nuts.",
  },
  brot: {
    badgeDE: "Frisch aus dem Tandoor",
    badgeEN: "Fresh Tandoori Flatbreads",
    descDE: "Ofenfrische Fladenbrote mit geschmolzener Butter, Knoblauch, Koriander oder feinem Paneer.",
    descEN: "Oven-warm artisanal flatbreads brushed with clarified butter, roasted garlic, or filled with cheese.",
  },
  beilagen: {
    badgeDE: "Chutneys & Beilagen",
    badgeEN: "Accompaniments & Sides",
    descDE: "Erfrischendes Gurken-Raita, süßes Mango-Chutney, pikante Pickles und duftender Basmati-Reis.",
    descEN: "Cooling cucumber raita, sweet mango chutney, house-pickled relish, and fragrant basmati rice.",
  },
  salate: {
    badgeDE: "Knackfrische Salate",
    badgeEN: "Crisp Fresh Salads",
    descDE: "Bunte Salatvariationen mit gegrilltem Tandoori-Hähnchen, Paneer oder indischem Haus-Dressing.",
    descEN: "Vibrant garden salads topped with warm charcoal-grilled tandoori chicken or paneer cheese.",
  },
  desserts: {
    badgeDE: "Königliche Nachspeisen",
    badgeEN: "Royal Desserts",
    descDE: "Warme Gulab Jamun, cremiges Kulfi-Eis mit Pistazien und Safran als süßer Festmahlabschluss.",
    descEN: "Warm syrup-soaked gulab jamun, house-churned pistachio-saffron kulfi, and regal sweets.",
  },
  cocktails: {
    badgeDE: "Signature Cocktails",
    badgeEN: "Signature Cocktails",
    descDE: "Kreative Eigenkreationen mit indischen Botanicals, Mango, Kardamom und feinen Spirituosen.",
    descEN: "Handcrafted signatures infused with mango puree, cardamom, rose petals, and premium spirits.",
  },
  weine: {
    badgeDE: "Weine & Erfrischungen",
    badgeEN: "Wines & Refreshing Drinks",
    descDE: "Ausgewählte deutsche und europäische Weine, indisches Kingfisher Bier und hausgemachtes Lassi.",
    descEN: "Carefully curated German and international wines, authentic Indian Kingfisher beer, and fresh lassis.",
  },
};

const POPULAR_SEARCHES = ["Butter Chicken", "Samosa", "Biryani", "Paneer Tikka", "Naan", "Mango Lassi"];

// Food Image Resolver with AI images & high-resolution culinary photography
function getItemFoodImage(item: MenuItem, categoryId: string): string {
  const lowerName = item.name.toLowerCase();

  // Specific AI generated images
  if (lowerName.includes("tandoori") || lowerName.includes("tikka") || categoryId === "tandoori") {
    return "/images/ai-food-tandoori.jpg";
  }
  if (
    lowerName.includes("naan") ||
    lowerName.includes("brot") ||
    lowerName.includes("roti") ||
    lowerName.includes("bhatura") ||
    categoryId === "brot"
  ) {
    return "/images/ai-food-naan.jpg";
  }
  if (
    lowerName.includes("lamb") ||
    lowerName.includes("lamm") ||
    lowerName.includes("mutton") ||
    lowerName.includes("rogan") ||
    categoryId === "lamb"
  ) {
    return "/images/ai-food-lamb.jpg";
  }
  if (
    lowerName.includes("lassi") ||
    lowerName.includes("cocktail") ||
    lowerName.includes("wein") ||
    lowerName.includes("drink") ||
    categoryId === "cocktails" ||
    categoryId === "weine"
  ) {
    return "/images/ai-food-drink.jpg";
  }

  // Curated authentic culinary images
  if (lowerName.includes("biryani") || categoryId === "biryani") return "/images/food-biryani.jpg";
  if (lowerName.includes("samosa") || lowerName.includes("pakora") || categoryId === "vorspeisen") {
    return "/images/food-samosa.jpg";
  }
  if (lowerName.includes("paneer") || categoryId === "vegetarisch" || categoryId === "vegan") {
    return "/images/food-paneer.jpg";
  }
  if (
    lowerName.includes("chicken") ||
    lowerName.includes("murgh") ||
    lowerName.includes("korma") ||
    lowerName.includes("butter chicken") ||
    categoryId === "chicken" ||
    categoryId === "ente"
  ) {
    return "/images/food-chicken.jpg";
  }
  if (
    lowerName.includes("garnelen") ||
    lowerName.includes("shrimp") ||
    lowerName.includes("prawn") ||
    lowerName.includes("fish") ||
    lowerName.includes("fisch") ||
    lowerName.includes("lachs") ||
    categoryId === "fisch"
  ) {
    return "/images/food-seafood.jpg";
  }
  if (lowerName.includes("salad") || lowerName.includes("salat") || categoryId === "salate") {
    return "/images/food-salad.jpg";
  }
  if (
    lowerName.includes("gulab") ||
    lowerName.includes("kulfi") ||
    lowerName.includes("dessert") ||
    categoryId === "desserts"
  ) {
    return "/images/food-dessert.jpg";
  }

  return "/images/food-chicken.jpg";
}

// Split dish name into cursive script prefix + bold title like the Pinterest reference
function splitTitle(name: string): { script: string; bold: string } {
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return { script: "Royal", bold: words[0] };
  }
  if (words.length === 2) {
    return { script: words[0], bold: words[1] };
  }
  return {
    script: words[0],
    bold: words.slice(1).join(" "),
  };
}

export default function MenuPage() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("vorspeisen");
  const [filterDiet, setFilterDiet] = useState<"all" | "veg" | "vegan" | "non-veg">("all");
  const [filterSpice, setFilterSpice] = useState<"all" | "mild" | "medium" | "hot">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate dynamic dish totals for badges
  const counts = useMemo(() => {
    let total = 0;
    let veg = 0;
    let vegan = 0;
    let nonVeg = 0;

    menuCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        total++;
        const diet = getItemDietaryType(item, cat.id);
        if (diet === "vegan") {
          vegan++;
          veg++;
        } else if (diet === "veg") {
          veg++;
        } else if (diet === "non-veg") {
          nonVeg++;
        }
      });
    });

    return { total, veg, vegan, nonVeg };
  }, []);

  const activeCat = menuCategories.find((c) => c.id === selectedCategory) || menuCategories[0];
  const meta = CATEGORY_DESCRIPTIONS[activeCat.id] || {
    badgeDE: "Spezialitäten",
    badgeEN: "Specialties",
    descDE: "Traditionelle Rezepturen zubereitet mit erlesenen Gewürzen.",
    descEN: "Traditional recipes prepared with exquisite spices.",
  };

  const isSearching = searchQuery.trim().length > 0;

  // Filter items
  const { displayItems, searchMatchesByCat } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesFilters = (item: MenuItem, catId: string) => {
      const dietType = getItemDietaryType(item, catId);
      if (filterDiet === "veg" && dietType !== "veg" && dietType !== "vegan") return false;
      if (filterDiet === "vegan" && dietType !== "vegan") return false;
      if (filterDiet === "non-veg" && dietType !== "non-veg") return false;

      if (filterSpice !== "all") {
        if (!item.spiceLevel || item.spiceLevel !== filterSpice) return false;
      }

      if (q) {
        const matchName =
          item.name.toLowerCase().includes(q) ||
          (item.nameDE && item.nameDE.toLowerCase().includes(q));
        const matchDesc =
          item.description.toLowerCase().includes(q) ||
          (item.descriptionDE && item.descriptionDE.toLowerCase().includes(q));
        const matchTags = item.tags && item.tags.some((tg) => tg.toLowerCase().includes(q));
        return Boolean(matchName || matchDesc || matchTags);
      }

      return true;
    };

    if (isSearching) {
      // Global search across all categories
      const allMatches: { item: MenuItem; categoryId: string; categoryLabel: string }[] = [];
      const matchesByCat: Record<string, number> = {};

      menuCategories.forEach((cat) => {
        const matching = cat.items.filter((item) => matchesFilters(item, cat.id));
        if (matching.length > 0) {
          matchesByCat[cat.id] = matching.length;
          matching.forEach((item) => {
            allMatches.push({
              item,
              categoryId: cat.id,
              categoryLabel: lang === "de" ? cat.labelDE : cat.label,
            });
          });
        }
      });

      return {
        displayItems: allMatches,
        searchMatchesByCat: matchesByCat,
      };
    }

    // Default view: filtered items in current category
    const items = activeCat.items
      .filter((item) => matchesFilters(item, activeCat.id))
      .map((item) => ({
        item,
        categoryId: activeCat.id,
        categoryLabel: lang === "de" ? activeCat.labelDE : activeCat.label,
      }));

    return { displayItems: items, searchMatchesByCat: {} };
  }, [searchQuery, filterDiet, filterSpice, activeCat, lang, isSearching]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery("");
  };

  const handleResetFilters = () => {
    setFilterDiet("all");
    setFilterSpice("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#4a0101]">
      {/* ============================================================ */}
      {/* 1. HERO HEADER: Blurred Ambiance with Royal Typography       */}
      {/* ============================================================ */}
      <header className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 overflow-hidden bg-[#260000] text-white">
        {/* Background image with minimal blur */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-maharaja.jpg"
            alt="Maharaja The Royals Ambiance"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-102 filter blur-[1.5px] sm:blur-[2px] brightness-[0.9]"
          />
          {/* Subtle balanced dark overlay: keeps image sharp & clear while ensuring text contrast */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#4a0101]/25 to-[#1a0000]/80" />
        </div>

        {/* Header Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="tracking-[0.35em] uppercase text-xs mb-3 font-inria font-semibold text-[#f7b800] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t.menuPageSubtitle}
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-inria tracking-tight text-white mb-4 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            {t.menuPageTitle}
          </h1>

          <NakasiDivider color="gold" />

          <p className="text-white text-base sm:text-lg font-nunito font-normal max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {t.menuPageDesc}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <RoyalButton
              href="https://reservations.allo.restaurant/de/maharaja-the-royals"
              external
              variant="gold"
              size="sm"
            >
              {t.reserveTable}
            </RoyalButton>
            <RoyalButton href="tel:02315315195" variant="outline" size="sm">
              {t.callUsBtn}
            </RoyalButton>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. FEATURED RECIPE SPOTLIGHT (Strictly Maharaja Royal Theme) */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 bg-white border-b border-[#cda757]/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Plated Food Dish with Side Condiments */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px]">
                {/* Main Plated Dish */}
                <div className="relative w-full h-full rounded-[36px] overflow-hidden shadow-[0_25px_50px_rgba(74,1,1,0.22)] border-8 border-white bg-black/5 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/food-biryani.jpg"
                    alt="Maharaja Royal Mutton Biryani"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, 420px"
                    className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Side Condiment 1: Raita Bowl */}
                <div className="absolute -left-4 sm:-left-8 bottom-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-xl border-4 border-white bg-white hidden sm:block">
                  <Image
                    src="/images/food-paneer.jpg"
                    alt="Raita Side"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Side Condiment 2: Chutney Bowl */}
                <div className="absolute -bottom-4 right-10 sm:right-16 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-xl border-4 border-white bg-white">
                  <Image
                    src="/images/food-chicken.jpg"
                    alt="Curry Chutney"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Royal Garnish Emblem */}
                <div className="absolute top-4 -right-2 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f7b800] text-[#4a0101] shadow-lg flex items-center justify-center font-bold text-xs border-2 border-white">
                  ★
                </div>
              </div>
            </div>

            {/* Right Column: Recipe Details & Circular Price Tag in Royal Theme */}
            <div className="lg:col-span-6 relative">
              {/* Circular Price Stamp on top-right in Royal Theme */}
              <div className="absolute -top-6 right-0 sm:right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#4a0101] text-[#f7b800] shadow-xl flex flex-col items-center justify-center border-2 border-dashed border-[#cda757] rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/80">
                  PREIS
                </span>
                <span className="text-base sm:text-xl font-extrabold leading-none mt-0.5 text-white">
                  €16.90
                </span>
                <span className="text-[10px] text-[#f7b800] line-through leading-none mt-0.5">
                  €19.50
                </span>
              </div>

              {/* Script Subtitle + Big Bold Title */}
              <div className="pr-20">
                <span className="font-script text-3xl sm:text-4xl text-[#cda757] font-normal tracking-wide block mb-1">
                  Maharaja&apos;s Royal
                </span>
                <h2 className="font-inria text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#4a0101] leading-none mb-3">
                  Mutton Biryani
                </h2>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#cda757] text-sm tracking-wider">
                  ★★★★★
                </div>
                <span className="font-bold text-[#4a0101] text-sm">4.9</span>
                <span className="text-gray-500 text-xs font-nunito">
                  (521 Reviews / Bewertungen)
                </span>
              </div>

              {/* Floating Description Card */}
              <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-sm border border-[#cda757]/30 max-w-lg mb-8">
                <p className="font-nunito text-gray-800 text-sm sm:text-base leading-relaxed">
                  {lang === "de"
                    ? "Aromatisch, zart und meisterhaft geschichtet: Feinste Lammfleischstücke auf duftendem Basmati-Reis, verfeinert mit echtem Safran, grünem Kardamom, Nelken und Zimt. Eine royale Geschmackssymphonie."
                    : "Aromatic, soft, and tender chunks of lamb layered with royal basmati rice infused with delicate saffron, whole cardamom, cloves, and cinnamon — a symphony of flavours in every bite."}
                </p>
              </div>

              {/* Direct Link to Menu */}
              <div>
                <a
                  href="#menu-catalog"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4a0101] hover:bg-[#6b0202] text-[#f7b800] font-inria font-bold uppercase tracking-wider text-xs shadow-md hover:scale-105 active:scale-95 transition-all duration-200 border border-[#cda757]"
                >
                  <span>{lang === "de" ? "ZUR SPEISEKARTE" : "EXPLORE MENU"}</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FILTER & SEARCH CONTROLS (Strictly Website Palette)       */}
      {/* ============================================================ */}
      <section id="menu-catalog" className="bg-white border-b border-[#cda757]/25 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-[#cda757] rounded-full focus:outline-none focus:ring-2 focus:ring-[#cda757]/25 transition-all font-nunito text-[#4a0101]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700 font-nunito px-1.5 py-0.5 rounded"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons in Royal Theme */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider font-inria font-semibold text-[#4a0101] mr-1">
                {t.filterLabel}
              </span>

              {/* All */}
              <button
                onClick={() => setFilterDiet("all")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  filterDiet === "all"
                    ? "bg-[#4a0101] text-[#f7b800] border-2 border-[#f7b800] font-bold shadow-sm"
                    : "bg-white text-[#4a0101] border border-[#cda757]/40 hover:border-[#cda757]"
                }`}
              >
                <span>{t.filterAll}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterDiet === "all" ? "bg-white/20 text-[#f7b800]" : "bg-gray-100 text-[#4a0101]"
                  }`}
                >
                  {counts.total}
                </span>
              </button>

              {/* Vegetarian */}
              <button
                onClick={() => setFilterDiet("veg")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  filterDiet === "veg"
                    ? "bg-[#4a0101] text-[#f7b800] border-2 border-[#f7b800] font-bold shadow-sm"
                    : "bg-white text-[#4a0101] border border-[#cda757]/40 hover:border-[#cda757]"
                }`}
              >
                <span>{t.filterVeg}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterDiet === "veg" ? "bg-white/20 text-[#f7b800]" : "bg-gray-100 text-[#4a0101]"
                  }`}
                >
                  {counts.veg}
                </span>
              </button>

              {/* Vegan */}
              <button
                onClick={() => setFilterDiet("vegan")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  filterDiet === "vegan"
                    ? "bg-[#4a0101] text-[#f7b800] border-2 border-[#f7b800] font-bold shadow-sm"
                    : "bg-white text-[#4a0101] border border-[#cda757]/40 hover:border-[#cda757]"
                }`}
              >
                <span>{t.filterVegan}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterDiet === "vegan" ? "bg-white/20 text-[#f7b800]" : "bg-gray-100 text-[#4a0101]"
                  }`}
                >
                  {counts.vegan}
                </span>
              </button>

              {/* Non-Veg */}
              <button
                onClick={() => setFilterDiet("non-veg")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  filterDiet === "non-veg"
                    ? "bg-[#4a0101] text-[#f7b800] border-2 border-[#f7b800] font-bold shadow-sm"
                    : "bg-white text-[#4a0101] border border-[#cda757]/40 hover:border-[#cda757]"
                }`}
              >
                <span>{t.filterNonVeg}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterDiet === "non-veg" ? "bg-white/20 text-[#f7b800]" : "bg-gray-100 text-[#4a0101]"
                  }`}
                >
                  {counts.nonVeg}
                </span>
              </button>

              {/* Spice Level Dropdown */}
              <div className="relative inline-flex items-center ml-auto">
                <select
                  value={filterSpice}
                  onChange={(e) => setFilterSpice(e.target.value as any)}
                  className="text-xs font-inria tracking-wider py-1.5 px-3 bg-white border border-[#cda757]/50 hover:border-[#cda757] rounded-full text-[#4a0101] focus:outline-none focus:ring-1 focus:ring-[#cda757]"
                >
                  <option value="all">{lang === "de" ? "Alle Schärfegrade" : "All Spice Levels"}</option>
                  <option value="mild">{t.spiceMild}</option>
                  <option value="medium">{t.spiceMedium}</option>
                  <option value="hot">{t.spiceHot}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Search Chips */}
          {!isSearching && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 overflow-x-auto scrollbar-none text-[11px] font-nunito text-gray-500">
              <span className="font-inria uppercase tracking-wider text-gray-400 font-semibold whitespace-nowrap">
                {lang === "de" ? "Beliebte Gerichte:" : "Popular Dishes:"}
              </span>
              {POPULAR_SEARCHES.map((query) => (
                <button
                  key={query}
                  onClick={() => setSearchQuery(query)}
                  className="px-2.5 py-0.5 rounded-full bg-gray-100 hover:bg-[#fdf7ea] hover:text-[#4a0101] text-gray-700 transition-colors whitespace-nowrap"
                >
                  {query}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CATEGORY PILLS & PINTEREST RECIPE CARDS (Maharaja Theme) */}
      {/* ============================================================ */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        {/* Horizontal Category Nav */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap">
            {menuCategories.map((cat) => {
              const isActive = cat.id === selectedCategory && !isSearching;
              const catLabel = lang === "de" ? cat.labelDE : cat.label;
              const matchesCount = isSearching ? searchMatchesByCat[cat.id] : undefined;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-inria uppercase tracking-wider rounded-full transition-all duration-200 whitespace-nowrap border flex-shrink-0 ${
                    isActive
                      ? "bg-[#4a0101] text-[#f7b800] border-[#cda757] font-bold shadow-md"
                      : "bg-white text-[#4a0101] border-[#cda757]/30 hover:border-[#cda757]"
                  }`}
                >
                  <span>{catLabel}</span>
                  {matchesCount !== undefined ? (
                    <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#f7b800] text-[#4a0101]">
                      {matchesCount}
                    </span>
                  ) : (
                    <span className="ml-1.5 text-[10px] opacity-60">({cat.items.length})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Header Banner or Search Results Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#cda757]/35 shadow-sm mb-12 sm:mb-16">
          {isSearching ? (
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold font-inria text-[#4a0101]">
                  {lang === "de" ? "Suchergebnisse" : "Search Results"}
                </h2>
                <p className="text-xs font-nunito text-gray-500 mt-1">
                  {lang === "de"
                    ? `${displayItems.length} Gerichte für „${searchQuery}“ gefunden`
                    : `${displayItems.length} dishes found for "${searchQuery}"`}
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-inria uppercase tracking-wider text-[#4a0101] hover:underline font-bold"
              >
                {t.resetFilters} ✕
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] font-inria font-semibold text-[#cda757] block mb-1">
                    {lang === "de" ? meta.badgeDE : meta.badgeEN}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-inria tracking-tight text-[#4a0101]">
                    {lang === "de" ? activeCat.labelDE : activeCat.label}
                  </h2>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#fdf7ea] border border-[#cda757]/45 text-[#4a0101] font-inria text-xs font-bold whitespace-nowrap">
                  {displayItems.length} {t.itemsCount}
                </span>
              </div>

              {/* Category culinary description */}
              <p className="text-gray-600 text-sm font-nunito leading-relaxed mt-2">
                {lang === "de" ? meta.descDE : meta.descEN}
              </p>

              {/* Dietary Key in Website Theme */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs font-inria text-[#4a0101]">
                <span className="text-[11px] uppercase tracking-wider font-bold">
                  {lang === "de" ? "Kennzeichnung:" : "Key:"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fdf7ea] text-[#4a0101] border border-[#cda757]">
                    VEG
                  </span>
                  <span>{lang === "de" ? "Vegetarisch" : "Vegetarian"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fdf7ea] text-[#4a0101] border border-[#cda757]">
                    VEGAN
                  </span>
                  <span>{lang === "de" ? "Vegan" : "Vegan"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fdf7ea] text-[#4a0101] border border-[#cda757]">
                    NON-VEG
                  </span>
                  <span>{lang === "de" ? "Nicht-Vegetarisch" : "Non-Vegetarian"}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Zero State */}
        {displayItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#cda757]/40 shadow-sm">
            <h3 className="text-xl font-bold font-inria text-[#4a0101] mb-2">
              {t.noDishesFound}
            </h3>
            <p className="text-gray-500 font-nunito text-sm max-w-md mx-auto mb-6">
              {lang === "de"
                ? "Versuchen Sie einen anderen Suchbegriff oder setzen Sie die Filter zurück."
                : "Try a different search keyword or reset your filters."}
            </p>
            <RoyalButton onClick={handleResetFilters} variant="gold" size="sm">
              {t.resetFilters}
            </RoyalButton>
          </div>
        ) : (
          /* ============================================================ */
          /* PINTEREST-STYLE RECIPE CARDS (Unified in Royal Maroon & Gold)*/
          /* No "Order Now" button - Pure Fine-Dining Elegance            */
          /* ============================================================ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 pt-12 pb-16">
            <AnimatePresence mode="popLayout">
              {displayItems.map(({ item, categoryId }) => {
                const titleParts = splitTitle(item.name);
                const originalPrice = (item.price * 1.15).toFixed(2);
                const foodImage = getItemFoodImage(item, categoryId);
                const dietaryType = getItemDietaryType(item, categoryId);

                return (
                  <motion.div
                    key={`${categoryId}-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-[32px] pt-28 pb-8 px-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-visible flex flex-col justify-between bg-gradient-to-b from-[#3a0000] to-[#4a0101] border border-[#cda757]/40 hover:border-[#f7b800]"
                  >
                    {/* Floating Food Dish Presentation at Top */}
                    <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-52 sm:h-52 z-10 pointer-events-none">
                      <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.5)] border-4 border-white/95 bg-black/20 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                        <Image
                          src={foodImage}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 176px, 208px"
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Circular Price Stamp on Top-Right Corner */}
                      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#fdf7ea] text-[#4a0101] shadow-2xl flex flex-col items-center justify-center border-2 border-dashed border-[#cda757] z-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-gray-500">
                          PREIS
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-[#4a0101] leading-tight">
                          €{item.price.toFixed(2)}
                        </span>
                        <span className="text-[9px] text-[#cda757] line-through leading-none mt-0.5">
                          €{originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Card Content - Pure Fine-Dining Focus */}
                    <div className="flex flex-col items-center flex-1 justify-between">
                      <div className="w-full">
                        {/* Two-part Typography: Script Prefix in Royal Gold + Bold Title in White */}
                        <span className="font-script text-2xl sm:text-3xl text-[#f7b800] font-normal tracking-wide block drop-shadow-sm">
                          {titleParts.script}
                        </span>
                        <h3 className="font-inria text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 leading-tight drop-shadow-sm">
                          {titleParts.bold}
                        </h3>

                        {/* Secondary Language Title if available */}
                        {item.nameDE && item.name && (
                          <p className="text-[11px] text-[#f7b800]/80 font-nunito italic mb-2.5 truncate max-w-full">
                            {lang === "de" ? item.name : item.nameDE}
                          </p>
                        )}

                        {/* Star Rating & Dietary / Heat Tag in Royal Theme */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-[#cda757]/30 text-[#f7b800] text-xs font-bold mb-3 shadow-inner">
                          <span className="tracking-wider text-[#f7b800]">★★★★★</span>
                          <span className="text-white text-[11px] font-extrabold">4.8</span>
                          {dietaryType && (
                            <span className="text-[#f7b800]/90 text-[10px] font-semibold uppercase">
                              · {dietaryType}
                            </span>
                          )}
                          {item.spiceLevel && (
                            <span className="text-white/60 text-[10px] font-normal uppercase">
                              · {item.spiceLevel}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="font-nunito text-xs sm:text-[13px] text-white/85 leading-relaxed line-clamp-3 px-1">
                          {lang === "de" && item.descriptionDE
                            ? item.descriptionDE
                            : item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. BOTTOM RESERVATION CARD                                   */}
        {/* ============================================================ */}
        <div className="mt-14">
          <NakasiCard size="xs" className="text-center rounded-2xl overflow-hidden shadow-xl">
            <p
              className="text-xs uppercase tracking-[0.3em] font-inria mb-2 font-semibold"
              style={{ color: "#cda757" }}
            >
              {lang === "de" ? "Königlich Speisen" : "Dine Like Royalty"}
            </p>
            <h3 className="text-2xl sm:text-4xl font-inria font-bold text-white mb-3 tracking-tight">
              {lang === "de"
                ? "Erleben Sie ein unvergessliches Festmahl"
                : "Join Us for an Unforgettable Feast"}
            </h3>
            <p className="font-nunito text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
              {t.reservationCardDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <RoyalButton
                href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                external
                variant="gold"
                size="md"
              >
                {t.reserveTable}
              </RoyalButton>
              <RoyalButton href="tel:02315315195" variant="outline" size="md">
                {t.callUsBtn}
              </RoyalButton>
            </div>

            {/* Address & Hours Footnote */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 text-xs font-nunito text-white/70">
              <span>Akazienstraße 85, 44143 Dortmund</span>
              <span>·</span>
              <span>Mo, Di, Do, Fr: 15:00 – 22:30 Uhr</span>
              <span>·</span>
              <span>Sa & So: 13:00 – 23:00 Uhr</span>
            </div>
          </NakasiCard>
        </div>
      </div>
    </div>
  );
}
