import type { Metadata } from "next";
import { PropertiesSection } from "@/components/PropertiesSection";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Propiedades en venta y alquiler en Miravalles: casas, fincas, lotes y comercios para quienes desean vivir o invertir en la zona."
};

export default function PropertiesPage() {
  return (
    <SimplePage
      eyebrow="Propiedades"
      title="Vivir o invertir en Miravalles"
      description="Te gustó la zona, quieres vivir acá. Este espacio prepara la plataforma para ofrecer propiedades en venta o alquiler de forma ordenada y discreta."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <PropertiesSection />
      </div>
    </SimplePage>
  );
}
