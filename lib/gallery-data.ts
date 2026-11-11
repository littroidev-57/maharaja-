export type GalleryImage = {
  src: string;
  alt: string;
  altDE?: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait" | "tall-portrait";
  category?: "interior" | "exterior" | "food" | "ambience";
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/4-1370x550.jpg",
    alt: "Royal dining room with Maharaja Ranjit Singh portrait and star ceiling",
    altDE: "Königlicher Speisesaal mit Porträt von Maharaja Ranjit Singh und Sternenhimmel",
    width: 1370,
    height: 550,
    orientation: "landscape",
    category: "interior",
  },
  {
    src: "/images/hero-maharaja.jpg",
    alt: "Warm-lit dining hall with bar and royal décor",
    altDE: "Warm beleuchteter Speisesaal mit Bar und königlichem Dekor",
    width: 1024,
    height: 768,
    orientation: "landscape",
    category: "interior",
  },
  {
    src: "/images/22-1152x1536.jpg",
    alt: "Maharaja The Royals exterior facade in Dortmund",
    altDE: "Außenfassade des Restaurants Maharaja The Royals in Dortmund",
    width: 1152,
    height: 1536,
    orientation: "tall-portrait",
    category: "exterior",
  },
  {
    src: "/images/7-1024x768.jpg",
    alt: "Elegant dining room interior with velvet chairs",
    altDE: "Elegantes Restaurant-Interieur mit bequemen Sesseln",
    width: 1024,
    height: 768,
    orientation: "landscape",
    category: "interior",
  },
  {
    src: "/images/11-768x1024.jpg",
    alt: "Restaurant interior detail",
    altDE: "Stilvolles Detail unseres Restaurant-Interieurs",
    width: 768,
    height: 1024,
    orientation: "portrait",
    category: "interior",
  },
  {
    src: "/images/8-1024x768.jpg",
    alt: "Dining area with lush green plants and warm lighting",
    altDE: "Speisebereich mit grünen Pflanzen und stimmungsvoller Beleuchtung",
    width: 1024,
    height: 768,
    orientation: "landscape",
    category: "interior",
  },
  {
    src: "/images/15-768x1024.jpg",
    alt: "Intimate dining setting",
    altDE: "Gemütliches und intimes Ambiente für Gäste",
    width: 768,
    height: 1024,
    orientation: "portrait",
    category: "ambience",
  },
  {
    src: "/images/9.jpg",
    alt: "Restaurant ambience",
    altDE: "Königliche Palast-Atmosphäre im Innenbereich",
    width: 1024,
    height: 768,
    orientation: "landscape",
    category: "ambience",
  },
  {
    src: "/images/16-768x1024.jpg",
    alt: "Royal interior detail",
    altDE: "Königliches Interieur mit goldenen Akzenten",
    width: 768,
    height: 1024,
    orientation: "portrait",
    category: "interior",
  },
  {
    src: "/images/10-1024x768.jpg",
    alt: "Comfortable seating area",
    altDE: "Bequemer Loungebereich für genussvolle Abende",
    width: 1024,
    height: 768,
    orientation: "landscape",
    category: "interior",
  },
  {
    src: "/images/24-1152x1536.jpg",
    alt: "Restaurant portrait detail",
    altDE: "Dekorativer Innenbereich mit indischen Stilelementen",
    width: 1152,
    height: 1536,
    orientation: "tall-portrait",
    category: "interior",
  },
  {
    src: "/images/17-1536x2048.jpg",
    alt: "Restaurant portrait",
    altDE: "Prachtvoller Raumeindruck im Maharaja",
    width: 1536,
    height: 2048,
    orientation: "tall-portrait",
    category: "interior",
  },
  {
    src: "/images/19-768x1024.jpg",
    alt: "Dining room detail",
    altDE: "Detailansicht unseres Festsaals",
    width: 768,
    height: 1024,
    orientation: "portrait",
    category: "interior",
  },
  {
    src: "/images/20-768x1024.jpg",
    alt: "Ambience shot",
    altDE: "Elegante Lichtstimmung im Restaurant",
    width: 768,
    height: 1024,
    orientation: "portrait",
    category: "ambience",
  },
  {
    src: "/images/21-768x1024.jpg",
    alt: "Restaurant interior portrait",
    altDE: "Perspektive auf den königlichen Gästebereich",
    width: 768,
    height: 1024,
    orientation: "portrait",
    category: "interior",
  },
  {
    src: "/images/6-scaled.jpg",
    alt: "Exterior of Maharaja The Royals restaurant",
    altDE: "Außenansicht des Restaurants Maharaja The Royals in Dortmund",
    width: 1200,
    height: 800,
    orientation: "landscape",
    category: "exterior",
  },
];

export const heroImages = [
  {
    src: "/images/hero-maharaja.jpg",
    alt: "Maharaja The Royals dining room",
    altDE: "Maharaja The Royals Speisesaal",
  },
  {
    src: "/images/4-1370x550.jpg",
    alt: "Royal interior with star ceiling",
    altDE: "Königliches Interieur mit Sternenhimmel",
  },
  {
    src: "/images/imgi_50_slider-1-1024x455.jpg",
    alt: "Maharaja The Royals ambience",
    altDE: "Maharaja The Royals Ambiente",
  },
];
