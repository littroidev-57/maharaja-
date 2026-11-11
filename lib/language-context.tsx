"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "de" | "en";

export type Translations = {
  // Navigation & General
  navHome: string;
  navMenu: string;
  navGallery: string;
  navAbout: string;
  navContact: string;
  navClose: string;
  navLanguage: string;
  reserveTable: string;
  viewMenu: string;
  welcomeTo: string;
  tagline: string;
  scroll: string;

  // Hero Section
  heroReserveTable: string;

  // Story / About Preview (Home)
  heritageSubtitle: string;
  heritageTitle: string;
  storyQuote: string;
  storyP1: string;
  storyP2: string;
  ourStoryBtn: string;
  readFullStoryBtn: string;
  statsTradition: string;
  statsMenu: string;
  statsGuests: string;
  statsSpice: string;

  // Menu Preview (Home)
  cuisineSubtitle: string;
  cuisineTitle: string;
  cuisineDesc: string;
  exploreMenuBtn: string;

  // Gallery Preview (Home)
  ambienceSubtitle: string;
  ambienceTitle: string;
  ambienceDesc: string;
  viewGalleryBtn: string;
  viewHorizontal: string;
  viewVertical: string;

  // Reservation Section (Home)
  hospitalitySubtitle: string;
  hospitalityTitle: string;
  hospitalityDesc: string;
  reservationCardTitle: string;
  reservationCardDesc: string;
  bookOnlineBtn: string;
  callUsBtn: string;

  // Location Section (Home)
  locationSubtitle: string;
  locationTitle: string;
  locationDesc: string;
  exclusiveOutlet: string;
  openToday: string;
  addressLabel: string;
  openingHours: string;
  monTue: string;
  wedClosed: string;
  thuFri: string;
  satSun: string;
  getDirections: string;

  // Footer
  footerTagline: string;
  allRightsReserved: string;
  quickContact: string;

  // Mobile Floating Bar
  barMenu: string;
  barCall: string;
  barMap: string;
  barReserve: string;

  // Menu Page
  menuPageSubtitle: string;
  menuPageTitle: string;
  menuPageDesc: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterAll: string;
  filterVeg: string;
  filterVegan: string;
  filterNonVeg: string;
  categoriesLabel: string;
  itemsCount: string;
  noDishesFound: string;
  resetFilters: string;
  spiceMild: string;
  spiceMedium: string;
  spiceHot: string;

  // Gallery Page
  galleryPageSubtitle: string;
  galleryPageTitle: string;
  galleryPageDesc: string;
  galleryFilterAll: string;
  galleryFilterInterior: string;
  galleryFilterExterior: string;
  galleryFilterAmbience: string;

  // About Page
  aboutPageSubtitle: string;
  aboutPageTitle: string;
  aboutPageDesc: string;
  aboutVisionTitle: string;
  aboutVisionP1: string;
  aboutVisionP2: string;
  aboutCraftTitle: string;
  aboutCraftP1: string;
  aboutCraftP2: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  aboutCtaTitle: string;
  aboutCtaDesc: string;
  aboutCtaBtn: string;

  // Contact Page
  contactPageSubtitle: string;
  contactPageTitle: string;
  contactPageDesc: string;
  contactDetailsTitle: string;
  contactPhoneLabel: string;
  contactEmailLabel: string;
  contactHoursTitle: string;
  contactFormTitle: string;
  contactFormDesc: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formDate: string;
  formTime: string;
  formGuests: string;
  formGuestsOption: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSuccessTitle: string;
  formSuccessMsg: string;
  formSendAnother: string;
  openGoogleMaps: string;
};

const translations: Record<Language, Translations> = {
  de: {
    // Navigation & General
    navHome: "Startseite",
    navMenu: "Speisekarte",
    navGallery: "Galerie",
    navAbout: "Über Uns",
    navContact: "Kontakt",
    navClose: "Schließen",
    navLanguage: "Sprache",
    reserveTable: "Tisch Reservieren",
    viewMenu: "Speisekarte Ansehen",
    welcomeTo: "Willkommen im",
    tagline: "Authentische Königliche Indische Küche · Dortmund",
    scroll: "Entdecken",

    // Hero Section
    heroReserveTable: "Tisch Reservieren",

    // Story / About Preview (Home)
    heritageSubtitle: "Unsere Geschichte",
    heritageTitle: "Ein Königliches Restauranterlebnis",
    storyQuote:
      "Wo die Pracht der königlichen Paläste des Punjab auf Dortmunds herzliche Gastfreundschaft trifft.",
    storyP1:
      "Das Restaurant Maharaja The Royals entstand aus purer Leidenschaft für die traditionelle königliche nordindische Küche – reich an aromatischen Gewürzen, Safran und Jahrhunderte alten Palast-Rezepten.",
    storyP2:
      "Im Herzen von Dortmund erwartet Sie ein königliches Ambiente – veredelt mit goldenen Akzenten, funkelnden Sternenhimmeln und dem majestätischen Erbe von Sher-e-Punjab Maharaja Ranjit Singh.",
    ourStoryBtn: "Unsere Geschichte",
    readFullStoryBtn: "Ganze Geschichte Lesen",
    statsTradition: "Jahre Tradition",
    statsMenu: "Köstliche Gerichte",
    statsGuests: "Zufriedene Gäste",
    statsSpice: "Schärfegrade",

    // Menu Preview (Home)
    cuisineSubtitle: "Ausgewählte Spezialitäten",
    cuisineTitle: "Die Königliche Speisekarte",
    cuisineDesc:
      "Traditionelle indische Hofküche, verfeinert mit königlichen Gewürzen, zarten Spezialitäten aus dem Lehmofen und aromatischen Marinaden.",
    exploreMenuBtn: "Gesamte Speisekarte Ansehen",

    // Gallery Preview (Home)
    ambienceSubtitle: "Impressionen & Ambiente",
    ambienceTitle: "Die Palast-Galerie",
    ambienceDesc:
      "Ein visueller Einblick in unsere prachtvollen Räumlichkeiten, funkelnden Kronleuchter und einladenden Tische.",
    viewGalleryBtn: "Gesamte Galerie Ansehen",
    viewHorizontal: "Querformat",
    viewVertical: "Hochformat",

    // Reservation Section (Home)
    hospitalitySubtitle: "Gastfreundschaft · Mehman-Nawazi",
    hospitalityTitle: "Reservieren Sie Ihren Königlichen Tisch",
    hospitalityDesc:
      "Lassen Sie sich von königlicher Herzlichkeit, erlesenen Weinen und unvergesslichen Aromen verwöhnen.",
    reservationCardTitle: "Sofortige Online-Tischreservierung",
    reservationCardDesc:
      "Reservieren Sie Ihren Tisch direkt über unser offizielles Online-Reservierungssystem oder kontaktieren Sie uns telefonisch.",
    bookOnlineBtn: "Online Tisch Reservieren",
    callUsBtn: "Telefonisch Reservieren",

    // Location Section (Home)
    locationSubtitle: "Unser Standort in Dortmund",
    locationTitle: "Besuchen Sie Unseren Palast",
    locationDesc:
      "Erleben Sie königliche nordindische Spitzenküche in intimer, stilvoller Atmosphäre.",
    exclusiveOutlet: "Exklusiver Standort",
    openToday: "Heute Geöffnet",
    addressLabel: "Adresse",
    openingHours: "Öffnungszeiten",
    monTue: "Montag – Dienstag",
    wedClosed: "Mittwoch (Ruhetag / Geschlossen)",
    thuFri: "Donnerstag – Freitag",
    satSun: "Samstag – Sonntag",
    getDirections: "Route in Google Maps planen",

    // Footer
    footerTagline: "Authentische Königliche Indische Küche · Dortmund",
    allRightsReserved: "Alle Rechte vorbehalten.",
    quickContact: "Direktkontakt",

    // Mobile Floating Bar
    barMenu: "Speisekarte",
    barCall: "Anrufen",
    barMap: "Anfahrt",
    barReserve: "Reservieren",

    // Menu Page
    menuPageSubtitle: "Kulinarische Kostbarkeiten",
    menuPageTitle: "Das Königliche Festmahl",
    menuPageDesc:
      "Authentische Spezialitäten aus dem Punjab und Nordindien, zubereitet mit frisch gemahlenen Gewürzen, Safran, geröstetem Kreuzkümmel und königlicher Hingabe.",
    searchPlaceholder: "Gericht suchen (z. B. Butter Chicken, Paneer, Biryani)...",
    filterLabel: "Filter:",
    filterAll: "Alle",
    filterVeg: "Vegetarisch",
    filterVegan: "Vegan",
    filterNonVeg: "Nicht-Vegetarisch",
    categoriesLabel: "Kategorien",
    itemsCount: "Gerichte",
    noDishesFound: "Keine Gerichte gefunden, die Ihrer Auswahl entsprechen.",
    resetFilters: "Filter zurücksetzen",
    spiceMild: "Mild",
    spiceMedium: "Pikant",
    spiceHot: "Scharf",

    // Gallery Page
    galleryPageSubtitle: "Visuelles Erlebnis",
    galleryPageTitle: "Die Palast-Galerie",
    galleryPageDesc:
      "Entdecken Sie die königliche Architektur, handgefertigte Kunstakzente, den funkelnden Sternenhimmel und die einladende Atmosphäre unseres Dortmunder Hauses.",
    galleryFilterAll: "Alle",
    galleryFilterInterior: "Innenbereich",
    galleryFilterExterior: "Außenbereich",
    galleryFilterAmbience: "Ambiente",

    // About Page
    aboutPageSubtitle: "Das königliche Erbe · Unsere Geschichte",
    aboutPageTitle: "Über Maharaja The Royals",
    aboutPageDesc:
      "Wo jahrhundertealte Geheimnisse der kaiserlichen Paläste des Punjab auf moderne europäische Eleganz treffen.",
    aboutVisionTitle: "Eine Symphonie aus Tradition & Gastfreundschaft",
    aboutVisionP1:
      "Bei Maharaja The Royals schaffen wir mehr als ein gewöhnliches Restauranterlebnis: Wir haben einen sinnlichen Tribut an das goldene Zeitalter des Punjab geschaffen. Inspiriert von den Höfen des legendären Sher-e-Punjab Maharaja Ranjit Singh beruht unsere Gastronomie auf uneingeschränkter Herzlichkeit, erlesenen Zutaten und wahrer königlicher Gastfreundschaft (Mehman-Nawazi).",
    aboutVisionP2:
      "Jedes Gericht wird in unserer Küche mit vollendeter Sorgfalt und Ruhe zubereitet. Frisch gemahlene Garam Masalas, edler Kaschmir-Safran und feinstes Ghee verbinden sich zu samtigen Saucen und feurigen Tandoori-Köstlichkeiten.",
    aboutCraftTitle: "Die Meisterkunst des traditionellen Tandoors",
    aboutCraftP1:
      "Unser Lehm-Tandoorofen ist das Herzstück unserer Küche. Bei Temperaturen von über 400 °C werden Fleischspezialitäten mariniert, auf Spießen gegrillt und frische Naan-Brote direkt an die heiße Innenwand geschlagen.",
    aboutCraftP2:
      "Diese uralte Zubereitungsmethode verleiht unseren Gerichten das unverwechselbar rauchige Aroma, knusprige Ränder und zarte Saftigkeit.",
    pillar1Title: "Königliches Erbe",
    pillar1Desc:
      "Originalgetreue Rezepte der nordindischen Palastküche, mit höchster Sorgfalt bewahrt.",
    pillar2Title: "Frisch & Rein",
    pillar2Desc:
      "Ausschließlich frische Zutaten, hausgemachter Paneer und frisch gemahlene Kräuter & Gewürze.",
    pillar3Title: "Königliches Flair",
    pillar3Desc:
      "Warmes Licht, funkelnder Sternenhimmel und königlicher Komfort für unvergessliche Momente.",
    aboutCtaTitle: "Erleben Sie königlichen Genuss",
    aboutCtaDesc:
      "Besuchen Sie uns in Dortmund und genießen Sie ein unvergessliches Abendessen.",
    aboutCtaBtn: "Jetzt Tisch Reservieren",

    // Contact Page
    contactPageSubtitle: "Standort & Reservierung",
    contactPageTitle: "Kontakt & Anfahrt",
    contactPageDesc:
      "Wir freuen uns darauf, Sie in unserem Restaurant in Dortmund zu begrüßen. Reservieren Sie online oder kontaktieren Sie uns für individuelle Anfragen.",
    contactDetailsTitle: "Restaurant-Informationen",
    contactPhoneLabel: "Telefon / Reservierung",
    contactEmailLabel: "E-Mail Kontakt",
    contactHoursTitle: "Öffnungszeiten",
    contactFormTitle: "Nachricht oder Reservierungsanfrage",
    contactFormDesc:
      "Möchten Sie eine Feier ausrichten, einen Tisch reservieren oder haben Sie eine Frage? Schreiben Sie uns gerne.",
    formName: "Ihr Name *",
    formEmail: "E-Mail-Adresse *",
    formPhone: "Telefonnummer",
    formDate: "Wunschdatum",
    formTime: "Uhrzeit",
    formGuests: "Personenanzahl",
    formGuestsOption: "Gäste",
    formMessage: "Ihre Nachricht oder besondere Wünsche",
    formMessagePlaceholder: "Teilen Sie uns eventuelle Wünsche, Allergien oder Anmerkungen mit...",
    formSubmit: "Anfrage Absenden",
    formSuccessTitle: "Vielen Dank für Ihre Nachricht!",
    formSuccessMsg:
      "Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.",
    formSendAnother: "Weitere Nachricht senden",
    openGoogleMaps: "In Google Maps öffnen →",
  },
  en: {
    // Navigation & General
    navHome: "Home",
    navMenu: "Menu",
    navGallery: "Gallery",
    navAbout: "About",
    navContact: "Contact",
    navClose: "Close",
    navLanguage: "Language",
    reserveTable: "Reserve a Table",
    viewMenu: "View Menu",
    welcomeTo: "Welcome to",
    tagline: "Authentic Royal Punjabi Cuisine · Dortmund",
    scroll: "Scroll",

    // Hero Section
    heroReserveTable: "Reserve a Table",

    // Story / About Preview (Home)
    heritageSubtitle: "Our Heritage",
    heritageTitle: "A Royal Dining Experience",
    storyQuote:
      "Where the grandeur of Punjab's royal courts meets the warmth of Dortmund's dining scene.",
    storyP1:
      "Maharaja The Royals was born from a deep love for authentic Punjabi heritage cuisine — rich with centuries of royal tradition, aromatic spices, and the art of slow-cooked flavors.",
    storyP2:
      "Set in the heart of Dortmund, our restaurant is an oasis of royal elegance — adorned with golden accents, starry ceilings, and the majestic legacy of Sher-e-Punjab Maharaja Ranjit Singh.",
    ourStoryBtn: "Our Story",
    readFullStoryBtn: "Read Full Story",
    statsTradition: "Years of Tradition",
    statsMenu: "Menu Items",
    statsGuests: "Happy Guests",
    statsSpice: "Spice Levels",

    // Menu Preview (Home)
    cuisineSubtitle: "Curated Offerings",
    cuisineTitle: "The Royal Menu",
    cuisineDesc:
      "Traditional Indian court cuisine infused with royal spices, tender clay-oven grilling, and aromatic marinades.",
    exploreMenuBtn: "Explore Full Menu",

    // Gallery Preview (Home)
    ambienceSubtitle: "Visual Ambiance",
    ambienceTitle: "The Palace Gallery",
    ambienceDesc:
      "A visual glimpse into our opulent interiors, chandelier-lit rooms, and welcoming dining tables.",
    viewGalleryBtn: "View Full Gallery",
    viewHorizontal: "Horizontal View",
    viewVertical: "Portrait View",

    // Reservation Section (Home)
    hospitalitySubtitle: "Royal Hospitality · Mehman-Nawazi",
    hospitalityTitle: "Book Your Royal Table",
    hospitalityDesc:
      "Allow us to host your evening with regal warmth, fine wines, and unmatched flavors.",
    reservationCardTitle: "Instant Online Table Booking",
    reservationCardDesc:
      "Reserve your table immediately via our official online reservation system, or contact our host directly by phone.",
    bookOnlineBtn: "Reserve Online via Allo",
    callUsBtn: "Call to Reserve",

    // Location Section (Home)
    locationSubtitle: "Our Dortmund Location",
    locationTitle: "Visit Our Dortmund Palace",
    locationDesc:
      "Experience regal Punjabi fine dining in an intimate, elegant setting.",
    exclusiveOutlet: "Exclusive Outlet",
    openToday: "Open Today",
    addressLabel: "Address",
    openingHours: "Opening Hours",
    monTue: "Monday – Tuesday",
    wedClosed: "Wednesday (Closed / Rest Day)",
    thuFri: "Thursday – Friday",
    satSun: "Saturday – Sunday",
    getDirections: "Get Directions on Google Maps",

    // Footer
    footerTagline: "Authentic Royal Punjabi Cuisine · Dortmund",
    allRightsReserved: "All rights reserved.",
    quickContact: "Direct Contact",

    // Mobile Floating Bar
    barMenu: "Menu",
    barCall: "Call",
    barMap: "Map",
    barReserve: "Reserve",

    // Menu Page
    menuPageSubtitle: "Culinary Royalties",
    menuPageTitle: "The Royal Feast",
    menuPageDesc:
      "Authentic traditional Punjabi & North Indian delicacies cooked with freshly ground herbs, rich saffron, roasted cumin, and royal warmth.",
    searchPlaceholder: "Search dish (e.g. Butter Chicken, Paneer, Biryani)...",
    filterLabel: "Filter:",
    filterAll: "All",
    filterVeg: "Vegetarian",
    filterVegan: "Vegan",
    filterNonVeg: "Non-Veg",
    categoriesLabel: "Categories",
    itemsCount: "items",
    noDishesFound: "No dishes found matching your current filter.",
    resetFilters: "Reset filters",
    spiceMild: "Mild",
    spiceMedium: "Medium",
    spiceHot: "Hot",

    // Gallery Page
    galleryPageSubtitle: "Visual Experience",
    galleryPageTitle: "The Palace Gallery",
    galleryPageDesc:
      "Explore the royal architecture, hand-crafted interior touches, glittering starry ceilings, and authentic royal hospitality of Dortmund.",
    galleryFilterAll: "All",
    galleryFilterInterior: "Interior",
    galleryFilterExterior: "Exterior",
    galleryFilterAmbience: "Ambience",

    // About Page
    aboutPageSubtitle: "The Royal Legacy · Our History",
    aboutPageTitle: "About Maharaja The Royals",
    aboutPageDesc:
      "Where centuries-old culinary secrets from the imperial courts of Punjab blend seamlessly with modern European elegance.",
    aboutVisionTitle: "A Symphony of Heritage & Hospitality",
    aboutVisionP1:
      "At Maharaja The Royals, we set out to create more than just a dining destination; we created a sensory tribute to the golden era of Punjab. Inspired by the legendary courts of Sher-e-Punjab Maharaja Ranjit Singh, our culinary philosophy centers on unconditional generosity, noble flavours, and royal hospitality (Mehman-Nawazi).",
    aboutVisionP2:
      "Every dish that leaves our kitchen is slow-cooked to perfection, blending ground garam masalas, Kashmiri saffron, crushed nuts, and house-clarified butter into velvety gravies and flame-charred tandoori delicacies.",
    aboutCraftTitle: "The Ancient Mastery of the Clay Tandoor",
    aboutCraftP1:
      "Our intense clay tandoor oven stands at the heart of our culinary craft. At temperatures exceeding 400°C, skewered delicacies are flame-kissed and pillowy flatbreads are slapped directly against the blistering earthen walls.",
    aboutCraftP2:
      "This ancient method seals in natural juices while imparting an irreplaceable smoky aroma and delicate crisp char.",
    pillar1Title: "Imperial Heritage",
    pillar1Desc:
      "True-to-origin recipes from the grand royal kitchens of North India, honored with precision.",
    pillar2Title: "Fresh & Natural",
    pillar2Desc:
      "Crafted with fresh ingredients, house-made paneer, and whole herbs and spices ground daily.",
    pillar3Title: "Regal Ambience",
    pillar3Desc:
      "Warm golden lighting, starry skies, and royal comfort designed for unforgettable gatherings.",
    aboutCtaTitle: "Experience the Royalty",
    aboutCtaDesc:
      "Join us in Dortmund for an unforgettable evening of imperial hospitality.",
    aboutCtaBtn: "Reserve Your Table",

    // Contact Page
    contactPageSubtitle: "Location & Inquiries",
    contactPageTitle: "Contact & Visit Us",
    contactPageDesc:
      "We look forward to welcoming you at our single outlet in Dortmund. Book online or get in touch for special inquiries.",
    contactDetailsTitle: "Restaurant Details",
    contactPhoneLabel: "Phone / Booking Request",
    contactEmailLabel: "Email Contact",
    contactHoursTitle: "Opening Hours",
    contactFormTitle: "Send a Message or Booking Request",
    contactFormDesc:
      "Planning a celebration, seeking a reservation, or have a question? Leave us a note and we will reply promptly.",
    formName: "Full Name *",
    formEmail: "Email Address *",
    formPhone: "Phone Number",
    formDate: "Preferred Date",
    formTime: "Preferred Time",
    formGuests: "Number of Guests",
    formGuestsOption: "Guests",
    formMessage: "Message or Special Requests",
    formMessagePlaceholder: "Let us know your dietary preferences, celebration notes, or questions...",
    formSubmit: "Send Inquiry",
    formSuccessTitle: "Thank You for Reaching Out!",
    formSuccessMsg:
      "We have received your message and will get back to you as soon as possible.",
    formSendAnother: "Send another message",
    openGoogleMaps: "Open in Google Maps →",
  },
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
};

// Default language is German ("de") as requested:
// "in my website german is the first language and second is english"
const defaultLanguage: Language = "de";

const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLanguage,
  setLang: () => {},
  t: translations[defaultLanguage],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("maharaja_lang") as Language;
      if (saved === "de" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      } else {
        localStorage.setItem("maharaja_lang", defaultLanguage);
        document.documentElement.lang = defaultLanguage;
      }
    } catch {
      // localStorage may fail in restricted sandbox / private mode
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("maharaja_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: handleSetLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
