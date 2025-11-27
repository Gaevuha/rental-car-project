// app/catalog/[id]/page.tsx
import { fetchCarByIdServer } from "@/lib/api/serverApi";
import DetailCatalogPage from "./DetailCatalogPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return <p>Car not found</p>;
  }

  let car = null;

  try {
    car = await fetchCarByIdServer(id);
  } catch (err) {
    console.error("Error fetching car:", err);
    return <p>Car not found</p>;
  }

  if (!car) {
    return <p>Car not found</p>;
  }

  return <DetailCatalogPage car={car} />;
}
