import { notFound } from "next/navigation";
import { TREATMENTS_DATA } from "@/data/treatmentsData";
import TreatmentDetailClient from "@/components/TreatmentDetailClient";

export async function generateStaticParams() {
  return TREATMENTS_DATA.map((treatment) => ({
    slug: treatment.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const treatment = TREATMENTS_DATA.find((t) => t.slug === params.slug);
  if (!treatment) {
    return {
      title: "Treatment Not Found | Just Relax Spa",
    };
  }
  return {
    title: `${treatment.title} in Doha | Just Relax Spa`,
    description: `${treatment.description} Experience luxury men's wellness at Just Relax Spa Doha.`,
  };
}

export default function TreatmentPage({
  params,
}: {
  params: { slug: string };
}) {
  const treatment = TREATMENTS_DATA.find((t) => t.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  return <TreatmentDetailClient treatment={treatment} />;
}
