// components/Catalog/CatalogClient.tsx
"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/lib/store/carsStore";
import CarCard from "@/components/CarCard/CarCard";
import FiltersClient from "@/components/Filters/FiltersClient";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import type { CarsResponse } from "@/types/car";
import styles from "./CatalogPage.module.css";

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
    <section className={`${styles.catalog__section} section`}>
      <div className={`${styles.catalog__container} container`}>
        <FiltersClient brands={brands} />

        <ul className={styles.carList}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>

        {page < totalPages && <LoadMoreButton onLoadMore={handleLoadMore} />}
      </div>
    </section>
  );
}
