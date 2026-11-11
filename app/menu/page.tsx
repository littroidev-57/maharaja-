"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NakasiDivider } from "@/components/ui/NakasiDivider";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiCard } from "@/components/ui/NakasiCorner";
import { VegIcon, VeganIcon, NonVegIcon } from "@/components/ui/Icons";
import { menuCategories, type MenuItem, getItemDietaryType } from "@/lib/menu-data";
import { useLanguage } from "@/lib/language-context";

// Evocative category descriptions in German and English (No emojis or icons)
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

// Food Image Resolver: Pairs every dish with its authentic AI-generated or high-res culinary image
function getItemFoodImage(item: MenuItem, categoryId: string): string {
  // If a specific custom image is configured on the item, use it
  if (item.image) return item.image;

  const text = `${item.name} ${item.nameDE || ""} ${item.description || ""} ${item.descriptionDE || ""}`.toLowerCase();

  // 1. Tandoori & Tikka Specialties (Authentic Clay Oven AI Food Photography)
  if (
    categoryId === "tandoori" ||
    text.includes("tandoori") ||
    text.includes("tikka") ||
    text.includes("seekh") ||
    text.includes("malai tikka") ||
    text.includes("grill")
  ) {
    return "/images/ai-food-tandoori.jpg";
  }

  // 2. Fresh Oven-Baked Tandoori Flatbreads & Naans
  if (
    categoryId === "brot" ||
    text.includes("naan") ||
    text.includes("brot") ||
    text.includes("roti") ||
    text.includes("kulcha") ||
    text.includes("bhatura") ||
    text.includes("paratha")
  ) {
    return "/images/ai-food-naan.jpg";
  }

  // 3. Slow-Braised Lamb, Mutton & Rogan Josh Curries
  if (
    categoryId === "lamb" ||
    text.includes("lamb") ||
    text.includes("lamm") ||
    text.includes("mutton") ||
    text.includes("rogan") ||
    text.includes("bhuna gosht") ||
    text.includes("saag gosht")
  ) {
    return "/images/ai-food-lamb.jpg";
  }

  // 4. Cocktails, Mocktails, Lassi & Refreshing Drinks
  if (
    categoryId === "cocktails" ||
    categoryId === "weine" ||
    text.includes("lassi") ||
    text.includes("cocktail") ||
    text.includes("wein") ||
    text.includes("wine") ||
    text.includes("drink") ||
    text.includes("spritz") ||
    text.includes("gin") ||
    text.includes("bier") ||
    text.includes("beer")
  ) {
    return "/images/ai-food-drink.jpg";
  }

  // 5. Saffron Basmati Biryani Specialties
  if (
    categoryId === "biryani" ||
    text.includes("biryani") ||
    text.includes("pulao") ||
    text.includes("safran-reis")
  ) {
    return "/images/food-biryani.jpg";
  }

  // 6. Samosas, Pakoras & Crispy Street Food Starters
  if (
    categoryId === "vorspeisen" ||
    text.includes("samosa") ||
    text.includes("pakora") ||
    text.includes("bhaji") ||
    text.includes("chaat") ||
    text.includes("starter")
  ) {
    return "/images/food-samosa.jpg";
  }

  // 7. Vegetarian & Vegan Royal Curries (Paneer, Dal Makhani, Chana Masala)
  if (
    categoryId === "vegetarisch" ||
    categoryId === "vegan" ||
    text.includes("paneer") ||
    text.includes("palak") ||
    text.includes("dal makhani") ||
    text.includes("daal") ||
    text.includes("lentil") ||
    text.includes("linsen") ||
    text.includes("chana") ||
    text.includes("shahi") ||
    text.includes("kofta") ||
    text.includes("alu") ||
    text.includes("aloo") ||
    text.includes("gobi")
  ) {
    return "/images/food-paneer.jpg";
  }

  // 8. Coastal King Prawns & Fish Curries
  if (
    categoryId === "fisch" ||
    text.includes("garnelen") ||
    text.includes("shrimp") ||
    text.includes("prawn") ||
    text.includes("fish") ||
    text.includes("fisch") ||
    text.includes("lachs") ||
    text.includes("salmon") ||
    text.includes("jheenga")
  ) {
    return "/images/food-seafood.jpg";
  }

  // 9. Chicken Breast & Tender Duck Specialties
  if (
    categoryId === "chicken" ||
    categoryId === "ente" ||
    text.includes("chicken") ||
    text.includes("hähnchen") ||
    text.includes("huhn") ||
    text.includes("murgh") ||
    text.includes("butter chicken") ||
    text.includes("korma") ||
    text.includes("madras") ||
    text.includes("ente") ||
    text.includes("duck")
  ) {
    return "/images/food-chicken.jpg";
  }

  // 10. Fresh Salads
  if (categoryId === "salate" || text.includes("salat") || text.includes("salad")) {
    return "/images/food-salad.jpg";
  }

  // 11. Royal Desserts & Sweets (Gulab Jamun, Pistachio Kulfi)
  if (
    categoryId === "desserts" ||
    text.includes("dessert") ||
    text.includes("gulab") ||
    text.includes("kulfi") ||
    text.includes("halwa") ||
    text.includes("eis")
  ) {
    return "/images/food-dessert.jpg";
  }

  // 12. Soups & Aromatic Broths
  if (categoryId === "suppen" || text.includes("suppe") || text.includes("shorba")) {
    return "/images/food-chicken.jpg";
  }

  // 13. Sides, Chutneys & Accompaniments
  if (categoryId === "beilagen" || text.includes("raita") || text.includes("chutney")) {
    return "/images/ai-food-naan.jpg";
  }

  return "/images/food-chicken.jpg";
}

export default function MenuPage() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("vorspeisen");
  const [filterDiet, setFilterDiet] = useState<"all" | "veg" | "vegan" | "non-veg">("all");
  const [filterSpice, setFilterSpice] = useState<"all" | "mild" | "medium" | "hot">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

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
    <div className="min-h-screen bg-[#faf8f5] text-[#2b0b0b]">
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
      {/* 2. FILTER & SEARCH SECTION (In-flow, never overlapping)     */}
      {/* ============================================================ */}
      <section className="bg-white border-b border-[#cda757]/25 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input (No icon) */}
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

            {/* Dietary Filter Buttons (Clean text pills, no icons) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider font-inria font-semibold text-gray-500 mr-1">
                {t.filterLabel}
              </span>

              {/* All */}
              <button
                onClick={() => setFilterDiet("all")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${filterDiet === "all"
                  ? "bg-[#4a0101] text-white font-bold shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#cda757] hover:text-[#4a0101]"
                  }`}
              >
                <span>{t.filterAll}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterDiet === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {counts.total}
                </span>
              </button>

              {/* Vegetarian */}
              <button
                onClick={() => setFilterDiet("veg")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${filterDiet === "veg"
                  ? "bg-green-700 text-white font-bold shadow-sm"
                  : "bg-green-50 text-green-800 border border-green-200 hover:bg-green-100"
                  }`}
              >
                <span>{t.filterVeg}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterDiet === "veg" ? "bg-white/20 text-white" : "bg-green-100 text-green-900"
                    }`}
                >
                  {counts.veg}
                </span>
              </button>

              {/* Vegan */}
              <button
                onClick={() => setFilterDiet("vegan")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${filterDiet === "vegan"
                  ? "bg-emerald-800 text-white font-bold shadow-sm"
                  : "bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100"
                  }`}
              >
                <span>{t.filterVegan}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterDiet === "vegan" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-900"
                    }`}
                >
                  {counts.vegan}
                </span>
              </button>

              {/* Non-Veg */}
              <button
                onClick={() => setFilterDiet("non-veg")}
                className={`px-3.5 py-1.5 text-xs font-inria tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${filterDiet === "non-veg"
                  ? "bg-red-800 text-white font-bold shadow-sm"
                  : "bg-red-50 text-red-900 border border-red-200 hover:bg-red-100"
                  }`}
              >
                <span>{t.filterNonVeg}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterDiet === "non-veg" ? "bg-white/20 text-white" : "bg-red-100 text-red-900"
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
                  className="text-xs font-inria tracking-wider py-1.5 px-3 bg-white border border-gray-200 hover:border-[#cda757] rounded-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#cda757]"
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
                  className="px-2.5 py-0.5 rounded-full bg-gray-100 hover:bg-amber-100/70 hover:text-[#4a0101] text-gray-700 transition-colors whitespace-nowrap"
                >
                  {query}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CATEGORY BAR & MENU CARDS                                 */}
      {/* ============================================================ */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        {/* Horizontal Category Nav (All 16 categories, cleanly laid out) */}
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
                  className={`px-4 py-2 text-xs font-inria uppercase tracking-wider rounded-full transition-all duration-200 whitespace-nowrap border flex-shrink-0 ${isActive
                    ? "bg-[#4a0101] text-[#cda757] border-[#4a0101] font-bold shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#cda757] hover:text-[#4a0101]"
                    }`}
                >
                  <span>{catLabel}</span>
                  {matchesCount !== undefined ? (
                    <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#cda757] text-[#4a0101]">
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
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#cda757]/30 shadow-sm mb-6">
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
                className="text-xs font-inria uppercase tracking-wider text-[#8b1515] hover:underline font-bold"
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

                <div className="flex items-center gap-3">
                  {/* View Mode Switcher */}
                  <div className="inline-flex items-center p-1 rounded-full bg-gray-100 border border-gray-200">
                    <button
                      onClick={() => setViewMode("cards")}
                      className={`px-3 py-1 rounded-full text-xs font-inria tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${viewMode === "cards"
                          ? "bg-[#4a0101] text-[#cda757] font-bold shadow-sm"
                          : "text-gray-600 hover:text-[#4a0101]"
                        }`}
                      aria-label="Cards view"
                    >

                      <span className="hidden sm:inline">{lang === "de" ? "Galerie" : "Cards"}</span>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1 rounded-full text-xs font-inria tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${viewMode === "list"
                          ? "bg-[#4a0101] text-[#cda757] font-bold shadow-sm"
                          : "text-gray-600 hover:text-[#4a0101]"
                        }`}
                      aria-label="List view"
                    >
                      <span className="text-xs">☰</span>
                      <span className="hidden sm:inline">{lang === "de" ? "Liste" : "List"}</span>
                    </button>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#fdf7ea] border border-[#cda757]/35 text-[#4a0101] font-inria text-xs font-bold whitespace-nowrap">
                    {displayItems.length} {t.itemsCount}
                  </span>
                </div>
              </div>

              {/* Category culinary description */}
              <p className="text-gray-600 text-sm font-nunito leading-relaxed mt-2">
                {lang === "de" ? meta.descDE : meta.descEN}
              </p>

              {/* Typographic Dietary Key */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs font-inria text-gray-600">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#4a0101]">
                  {lang === "de" ? "Kennzeichnung:" : "Key:"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <VegIcon size={16} />
                  <span>{lang === "de" ? "Vegetarisch" : "Vegetarian"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <VeganIcon size={16} />
                  <span>{lang === "de" ? "Vegan" : "Vegan"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <NonVegIcon size={16} />
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
        ) : viewMode === "cards" ? (
          /* ============================================================ */
          /* 1. VISUAL CULINARY CARDS GRID (With AI & Authentic Dishes)   */
          /* ============================================================ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            <AnimatePresence mode="popLayout">
              {displayItems.map(({ item, categoryId, categoryLabel }) => {
                const dietaryType = getItemDietaryType(item, categoryId);

                return (
                  <motion.div
                    key={`${categoryId}-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white rounded-2xl border border-[#cda757]/30 hover:border-[#cda757] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                  >
                    {/* Image Container with Royal Gold Theme */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#260000]">
                      <Image
                        src={getItemFoodImage(item, categoryId)}
                        alt={lang === "de" && item.nameDE ? item.nameDE : item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.96]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                      {/* Top-Left: Dietary Icon Only */}
                      {dietaryType && (
                        <div className="absolute top-3 left-3 z-10 transition-transform duration-200 hover:scale-110">
                          {dietaryType === "veg" && <VegIcon size={20} className="shadow-md rounded" />}
                          {dietaryType === "vegan" && <VeganIcon size={20} className="shadow-md rounded" />}
                          {dietaryType === "non-veg" && <NonVegIcon size={20} className="shadow-md rounded" />}
                        </div>
                      )}

                      {/* Top-Right: Royal Gold Price Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7b800] to-[#cda757] text-[#260000] font-inria font-extrabold text-sm sm:text-base shadow-lg border border-white/40 tracking-tight flex items-center gap-0.5">
                          <span>€</span>
                          <span>{item.price.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Bottom Bar on Image: Spice Tag & Palace Star */}
                      <div className="absolute bottom-2.5 inset-x-3 z-10 flex items-center justify-between text-xs pointer-events-none">
                        <div>
                          {item.spiceLevel ? (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-inria font-semibold uppercase tracking-wider backdrop-blur-md border ${item.spiceLevel === "hot"
                                  ? "bg-red-950/80 text-red-200 border-red-500/50"
                                  : item.spiceLevel === "medium"
                                    ? "bg-amber-950/80 text-amber-200 border-amber-500/50"
                                    : "bg-black/60 text-white/90 border-white/20"
                                }`}
                            >
                              {item.spiceLevel === "mild"
                                ? "Mild"
                                : item.spiceLevel === "medium"
                                  ? "Medium"
                                  : "Scharf"}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-inria font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md text-white/80 border border-white/15">
                              Mild
                            </span>
                          )}
                        </div>

                        <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#f7b800] text-[10px] font-inria font-bold border border-white/15">
                          ★ 4.9
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                      <div>
                        <h3 className="font-inria text-base sm:text-lg font-bold text-[#4a0101] group-hover:text-[#8b1515] transition-colors leading-snug line-clamp-2">
                          {lang === "de" && item.nameDE ? item.nameDE : item.name}
                        </h3>

                        {item.nameDE && item.name && (
                          <p className="text-[11px] text-gray-500 font-nunito italic mt-0.5 mb-2 line-clamp-1">
                            {lang === "de" ? item.name : item.nameDE}
                          </p>
                        )}

                        <p className="font-nunito text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {lang === "de" && item.descriptionDE
                            ? item.descriptionDE
                            : item.description}
                        </p>
                      </div>

                      {/* Footer */}

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* ============================================================ */
          /* 2. COMPACT LIST VIEW (With Dish Thumbnail & Fast Scanning)   */
          /* ============================================================ */
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayItems.map(({ item, categoryId, categoryLabel }) => {
                const dietaryType = getItemDietaryType(item, categoryId);

                return (
                  <motion.div
                    key={`${categoryId}-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white rounded-2xl p-4 sm:p-5 border border-[#cda757]/25 hover:border-[#cda757] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
                  >
                    {/* Dish Image Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-[#260000] border border-[#cda757]/30">
                      <Image
                        src={getItemFoodImage(item, categoryId)}
                        alt={lang === "de" && item.nameDE ? item.nameDE : item.name}
                        fill
                        sizes="112px"
                        className="object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>

                    {/* Dish Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {dietaryType === "veg" && <VegIcon size={16} className="flex-shrink-0" />}
                        {dietaryType === "vegan" && <VeganIcon size={16} className="flex-shrink-0" />}
                        {dietaryType === "non-veg" && <NonVegIcon size={16} className="flex-shrink-0" />}
                        <h3 className="font-inria text-base sm:text-lg font-bold text-[#4a0101] group-hover:text-[#7d0000] transition-colors leading-snug">
                          {lang === "de" && item.nameDE ? item.nameDE : item.name}
                        </h3>
                      </div>

                      {item.nameDE && item.name && (
                        <p className="text-[11px] text-gray-500 font-nunito italic mb-1.5">
                          {lang === "de" ? item.name : item.nameDE}
                        </p>
                      )}

                      <p className="font-nunito text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {lang === "de" && item.descriptionDE
                          ? item.descriptionDE
                          : item.description}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <span className="font-inria font-extrabold text-base sm:text-lg text-[#4a0101] bg-[#fdf7ea] border border-[#cda757]/45 px-3 py-0.5 rounded-full">
                        €{item.price.toFixed(2)}
                      </span>
                      {isSearching ? (
                        <button
                          onClick={() => {
                            setSelectedCategory(categoryId);
                            setSearchQuery("");
                          }}
                          className="px-2.5 py-0.5 rounded-full bg-amber-50 hover:bg-[#cda757] hover:text-[#4a0101] text-[#4a0101] text-[10px] font-inria uppercase tracking-wider font-semibold border border-[#cda757]/30 transition-colors"
                        >
                          {categoryLabel} →
                        </button>
                      ) : (
                        <a
                          href="https://reservations.allo.restaurant/de/maharaja-the-royals"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-inria font-bold text-[#4a0101] hover:text-[#cda757] uppercase tracking-wider"
                        >
                          {lang === "de" ? "Reservieren →" : "Reserve →"}
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. BOTTOM RESERVATION CARD (Natural flow, never overlaps)   */}
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
