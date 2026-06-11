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
import { getSiteData } from "@/lib/site-api";

export default async function Home() {
  const siteData = await getSiteData();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats stats={siteData.stats} />
        <DiscoverSection />
        <AttractionsGrid attractions={siteData.attractions} />
        <ExperiencesSection experiences={siteData.experiences} experienceCategories={siteData.experienceCategories} featuredOnly limit={3} />
        <BusinessDirectory businesses={siteData.businesses} businessCategories={siteData.businessCategories} featuredOnly limit={3} />
        <PromoSlot promoSlots={siteData.promoSlots} index={0} />
        <MapSection mapPoints={siteData.mapPoints} />
        <WildlifeSection wildlife={siteData.wildlife} />
        <SponsorSection sponsors={siteData.sponsors} />
        <GallerySection gallery={siteData.gallery} />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
