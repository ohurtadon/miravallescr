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
import { getSiteData, type SiteBusiness, type SiteExperience } from "@/lib/site-api";

const HOME_CAROUSEL_LIMIT = 10;

export default async function Home() {
  const siteData = await getSiteData();
  const homeAttractions = randomSample(siteData.attractions, HOME_CAROUSEL_LIMIT);
  const homeExperiences = weightedSample(
    siteData.experiences.filter((experience) => experience.isFeatured),
    HOME_CAROUSEL_LIMIT,
    boostedWeight
  );
  const homeBusinesses = weightedSample(
    siteData.businesses.filter((business) => business.isFeatured),
    HOME_CAROUSEL_LIMIT,
    boostedWeight
  );

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats stats={siteData.stats} />
        <DiscoverSection />
        <AttractionsGrid attractions={homeAttractions} carousel />
        <ExperiencesSection experiences={homeExperiences} experienceCategories={siteData.experienceCategories} featuredOnly carousel />
        <BusinessDirectory businesses={homeBusinesses} businessCategories={siteData.businessCategories} featuredOnly carousel />
        <PromoSlot placement="home" businesses={siteData.businesses} experiences={siteData.experiences} properties={siteData.properties} />
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

function randomSample<T>(items: T[], limit: number) {
  const pool = [...items];

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  return pool.slice(0, limit);
}

function weightedSample<T>(items: T[], limit: number, weightFor: (item: T) => number) {
  const pool = [...items];
  const selected: T[] = [];

  while (pool.length && selected.length < limit) {
    const totalWeight = pool.reduce((total, item) => total + weightFor(item), 0);
    let cursor = Math.random() * totalWeight;
    const index = pool.findIndex((item) => {
      cursor -= weightFor(item);
      return cursor <= 0;
    });

    selected.push(...pool.splice(index >= 0 ? index : pool.length - 1, 1));
  }

  return selected;
}

function boostedWeight(item: SiteBusiness | SiteExperience) {
  if (!item.isBoosted) return 1;
  return Math.max(Number(item.boostWeight ?? 1), 1);
}
