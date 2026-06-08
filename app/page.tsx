import { AttractionsGrid } from "@/components/AttractionsGrid";
import { CallToAction } from "@/components/CallToAction";
import { DiscoverSection } from "@/components/DiscoverSection";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { WildlifeSection } from "@/components/WildlifeSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <DiscoverSection />
        <AttractionsGrid />
        <MapSection />
        <WildlifeSection />
        <ExperiencesSection />
        <GallerySection />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
