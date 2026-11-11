import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { StorySection } from "@/components/sections/StorySection";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { GallerySection } from "@/components/sections/GallerySection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReservationSection } from "@/components/sections/ReservationSection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StorySection />
      <MenuPreview />
      <GallerySection />
      <ReservationSection />
      <LocationSection />
    </>
  );
}

