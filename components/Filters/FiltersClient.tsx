"use client";

import { useState } from "react";
import { useCarsStore } from "@/lib/store/carsStore";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./Filters.module.css";

interface FiltersClientProps {
  brands: string[];
}

export default function FiltersClient({ brands }: FiltersClientProps) {
  const { setFilters, loadCars } = useCarsStore();

  const [brand, setBrand] = useState(""); // "" = всі бренди
  const [price, setPrice] = useState(""); // "" = всі ціни
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSearch = async () => {
    setFilters({
      brand: brand || undefined,
      rentalPrice: price || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    });

    await loadCars({ page: 1 });
  };

  const formatNumber = (num: string) =>
    num ? Number(num).toLocaleString("en-US") : "";

  return (
    <div className={styles.filtersContainer}>
      {/* BRAND */}
      <div className={styles.filterBlock}>
        <CustomSelect
          label="Car brand"
          options={["", ...brands]} // перший пункт порожній
          value={brand}
          onChange={setBrand}
          placeholder="Choose a brand" // відображається якщо value = ""
          formatOptionLabel={(option) => option || "(All)"} // у випадаючому буде "(All)"
        />
      </div>

      {/* PRICE */}
      <div className={styles.filterBlock}>
        <CustomSelect
          label="Price / 1 hour"
          options={["", "30", "40", "50", "60", "70", "80", "90", "100"]}
          value={price}
          onChange={setPrice}
          placeholder="Choose a price"
          formatOptionLabel={(option) => (option ? `To $${option}` : "(All)")}
        />
      </div>

      {/* MILEAGE */}
      <div className={styles.filterBlock}>
        <label className={styles.filterLabel}>Car mileage / km</label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="From"
            className={styles.mileageInputLeft}
            value={minMileage ? `From ${formatNumber(minMileage)}` : ""}
            onChange={(e) => setMinMileage(e.target.value.replace(/\D/g, ""))}
          />
          <input
            type="text"
            placeholder="To"
            className={styles.mileageInputRight}
            value={maxMileage ? `To ${formatNumber(maxMileage)}` : ""}
            onChange={(e) => setMaxMileage(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className={`${styles.filterBlock} ${styles.searchBlock}`}>
        <button className={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
