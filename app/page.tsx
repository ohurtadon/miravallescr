import { AttractionsGrid } from "@/components/AttractionsGrid";
import { CallToAction } from "@/components/CallToAction";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { DiscoverSection } from "@/components/DiscoverSection";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { PromoSlot } from "@/components/PromoSlot";
import { SponsorSection } from "@/components/SponsorSection";
import { Stats } from "@/components/Stats";
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
        <ExperiencesSection featuredOnly limit={3} />
        <BusinessDirectory featuredOnly limit={3} />
        <PromoSlot index={0} />
        <MapSection />
        <WildlifeSection />
        <SponsorSection />
        <GallerySection />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
