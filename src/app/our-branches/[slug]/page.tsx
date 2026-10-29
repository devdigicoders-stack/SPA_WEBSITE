import { notFound } from "next/navigation";
import { BRANCHES_DETAILED_DATA } from "@/data/branchesDetailedData";
import BranchDetailClient from "@/components/BranchDetailClient";

export async function generateStaticParams() {
  return BRANCHES_DETAILED_DATA.map((branch) => ({
    slug: branch.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const branch = BRANCHES_DETAILED_DATA.find((b) => b.slug === params.slug);
  if (!branch) {
    return {
      title: "Branch Not Found | Just Relax Spa",
    };
  }
  return {
    title: `${branch.name} | Just Relax Spa Doha, Qatar`,
    description: `Visit Just Relax Spa at ${branch.name} — authentic Moroccan baths, Turkish hammams, therapeutic massages, certified master therapists in Doha. Open daily till 3:00 AM.`,
  };
}

export default function BranchPage({
  params,
}: {
  params: { slug: string };
}) {
  const branch = BRANCHES_DETAILED_DATA.find((b) => b.slug === params.slug);

  if (!branch) {
    notFound();
  }

  return <BranchDetailClient branch={branch} />;
}

