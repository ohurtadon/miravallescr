import { PromoSlot } from "@/components/PromoSlot";
import { getSiteData } from "@/lib/site-api";

type RecommendedSlotProps = {
  placement: string;
};

export async function RecommendedSlot({ placement }: RecommendedSlotProps) {
  const siteData = await getSiteData();

  return (
    <PromoSlot
      placement={placement}
      businesses={siteData.businesses}
      experiences={siteData.experiences}
      properties={siteData.properties}
    />
  );
}
