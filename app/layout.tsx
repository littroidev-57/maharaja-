import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileFloatingBar } from "@/components/layout/MobileFloatingBar";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://maharajatheroyals.com"),
  title: "Maharaja The Royals | Authentische Königliche Indische Küche – Dortmund",
  description:
    "Erleben Sie authentische königliche indische Küche im Restaurant Maharaja The Royals in Dortmund. Reservieren Sie noch heute Ihren Tisch in königlichem Ambiente.",
  keywords:
    "Indisches Restaurant Dortmund, Punjabi Essen, Maharaja Restaurant, Königliche indische Küche, Tandoori, Biryani, Dortmund Restaurant, Akazienstraße",
  openGraph: {
    title: "Maharaja The Royals",
    description: "Authentische Königliche Indische Küche in Dortmund",
    images: ["/images/4-1370x550.jpg"],
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Maharaja The Royals",
  image: "https://maharajatheroyals.com/images/4-1370x550.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Akazienstraße 85",
    addressLocality: "Dortmund",
    postalCode: "44143",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5076,
    longitude: 7.489,
  },
  url: "https://maharajatheroyals.com",
  telephone: "+492315315195",
  servesCuisine: ["Indian", "Punjabi", "Tandoori", "Halal"],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "13:00",
      closes: "23:00",
    },
  ],
  acceptsReservations: "True",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileFloatingBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
