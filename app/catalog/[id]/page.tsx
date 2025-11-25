import { fetchCarByIdServer } from "@/lib/api/serverApi";
import CarCard from "@/components/CarCard/CarCard";
import Image from "next/image";
import { Car } from "@/types/car";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: Props) {
  // Деструктуруємо id із промісу
  const { id } = await params;

  if (!id) {
    return <p>Car not found</p>;
  }

  // Отримуємо дані про машину з API
  let car: Car | null = null;
  try {
    car = await fetchCarByIdServer(id);
  } catch (error) {
    console.error("Error fetching car:", error);
    return <p>Car not found</p>;
  }

  return (
    <div>
      <h1>
        {car.brand} {car.model}
      </h1>

      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={600}
        height={400}
      />

      <p>{car.description}</p>

      <CarCard car={car} />
    </div>
  );
}
