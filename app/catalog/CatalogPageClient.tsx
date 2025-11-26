// components/Catalog/CatalogClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useCarsStore } from "@/lib/store/carsStore";
import CarCard from "@/components/CarCard/CarCard";
import FiltersClient from "@/components/Filters/FiltersClient";

import Loader from "@/components/Loader/Loader";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInitialData(initialData);
  }, [initialData, setInitialData]);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      await loadCars({ page: page + 1 });
    } finally {
      setLoading(false);
    }
  };

  const hasMore = page < totalPages;

  return (
    <section className={`${styles.catalog__section} section`}>
      <div className={`${styles.catalog__container} container`}>
        <FiltersClient brands={brands} />

        <ul className={styles.carList}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>

        {hasMore && (
          <div className={styles.loadMoreWrapper}>
            {loading ? (
              <Loader className={styles.loader} />
            ) : (
              <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
