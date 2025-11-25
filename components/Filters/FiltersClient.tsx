// components/Filters/FiltersClient.tsx
"use client";

import { useState } from "react";
import { useCarsStore } from "@/lib/store/carsStore";

interface FiltersClientProps {
  brands: string[]; // Бренди вже передані з сервера
}

export default function FiltersClient({ brands }: FiltersClientProps) {
  const { setFilters, loadCars } = useCarsStore();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
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

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    setFilters({});
    loadCars({ page: 1 });
  };

  return (
    <div className="filters-container">
      {/* Car brand */}
      <div className="filter-block">
        <label htmlFor="brand-select" className="filter-label">
          Car brand
        </label>
        <select
          id="brand-select"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="select-input"
        >
          <option value="">Choose a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="filter-block">
        <label htmlFor="price-select" className="filter-label">
          Price / 1 hour
        </label>
        <select
          id="price-select"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="select-input"
        >
          <option value="">Choose a price</option>
          {[30, 40, 50, 60, 70, 80, 90, 100].map((p) => (
            <option key={p} value={p}>
              ${p}
            </option>
          ))}
        </select>
      </div>

      {/* Mileage */}
      <div className="filter-block mileage-filter">
        <label className="filter-label">Car mileage / km</label>
        <div className="mileage-inputs">
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className="mileage-input"
            min="0"
          />
          <input
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className="mileage-input"
            min="0"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="filter-buttons">
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
