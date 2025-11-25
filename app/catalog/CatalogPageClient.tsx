// components/Catalog/CatalogClient.tsx
"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/lib/store/carsStore";
import CarCard from "@/components/CarCard/CarCard";
import FiltersClient from "@/components/Filters/FiltersClient";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import type { CarsResponse } from "@/types/car";

interface CatalogClientProps {
  initialData: CarsResponse;
  brands: string[];
}

export default function CatalogClient({
  initialData,
  brands,
}: CatalogClientProps) {
  const { cars, page, totalPages, setInitialData, loadCars } = useCarsStore();

  useEffect(() => {
    setInitialData(initialData);
  }, [initialData, setInitialData]);

  const handleLoadMore = async () => {
    await loadCars({ page: page + 1 });
  };

  return (
    <div className="catalog-container">
      <FiltersClient brands={brands} />

      <ul className="cars__list">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {page < totalPages && <LoadMoreButton onLoadMore={handleLoadMore} />}
    </div>
  );
}
