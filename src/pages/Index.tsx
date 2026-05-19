import { NavBar, HeroSection, StorySection } from "@/components/wedding/TopSections";
import { CountdownSection, GallerySection } from "@/components/wedding/MiddleSections";
import { DetailsSection, MapSection, WishesSection, Footer } from "@/components/wedding/BottomSections";

export default function Index() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <StorySection />
      <CountdownSection />
      <GallerySection />
      <DetailsSection />
      <MapSection />
      <WishesSection />
      <Footer />
    </div>
  );
}
