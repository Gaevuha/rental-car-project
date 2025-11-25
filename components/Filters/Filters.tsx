// components/Filters/FiltersServer.tsx
import { fetchBrandsServer } from "@/lib/api/serverApi";
import FiltersClient from "./FiltersClient";

interface FiltersServerProps {
  brands?: string[];
}

export default async function FiltersServer({ brands }: FiltersServerProps) {
  const brandsData = brands || (await fetchBrandsServer().catch(() => []));

  return <FiltersClient brands={brandsData} />;
}
