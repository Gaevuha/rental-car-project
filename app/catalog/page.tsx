// app/catalog/page.tsx
import { fetchCarsServer, fetchBrandsServer } from "@/lib/api/serverApi";
import CatalogClient from "./CatalogPageClient";
import { generatePageMetadata } from "../layout";

export const metadata = generatePageMetadata("catalog");

interface CatalogPageProps {
  searchParams?: Promise<{
    page?: string;
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const page = params?.page ? parseInt(params.page) : 1;
  const limit = 12;

  const [initialData, brands] = await Promise.all([
    fetchCarsServer({
      page: page.toString(),
      limit: limit.toString(),
      brand: params?.brand,
      rentalPrice: params?.price,
      minMileage: params?.minMileage,
      maxMileage: params?.maxMileage,
    }),
    fetchBrandsServer().catch(() => []),
  ]);

  return <CatalogClient initialData={initialData} brands={brands} />;
}
