// app/catalog/[id]/page.tsx
import { fetchCarByIdServer } from "@/lib/api/serverApi";
import DetailCatalogPage from "./DetailCatalogPage";
import { generatePageMetadata } from "../../layout";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  let car = null;

  try {
    car = await fetchCarByIdServer(id);
  } catch (err) {
    console.error("Error fetching car for metadata:", err);
  }

  const carTitle = car
    ? `${car.brand || car.brand || "Car"} ${car.model || ""} ${
        car.year || ""
      }`.trim()
    : "Car Details";

  const carDescription = car
    ? `Rent ${car.brand || car.brand || "Car"} ${car.model || ""} ${
        car.year || ""
      }. ${car.type || ""} • ${car.fuelConsumption || ""} • ${
        car.engineSize || ""
      }`
    : "View detailed information about this rental car";

  const carImage = car?.img || car?.brand || car?.img || "/img/rental-car.webp";

  return generatePageMetadata("details", {
    carTitle,
    carDescription,
    carImage,
  });
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
