// /lib/store/carsStore.ts
import { create } from "zustand";
import { fetchCarsClient } from "@/lib/api/clientApi";
import { Car, CarsFilters, CarsResponse } from "@/types/car";

interface CarsState {
  cars: Car[];
  favorites: Car[];
  filters: CarsFilters;
  page: number; //Store використовує числа
  totalPages: number;

  loadCars: (params?: { page?: number; limit?: number }) => Promise<void>;
  setFilters: (filters: CarsFilters) => void;
  setInitialData: (data: CarsResponse) => void;

  addToFavorites: (car: Car) => void;
  removeFromFavorites: (id: string) => void;
  setFavoritesFromStorage: () => void;
}

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  favorites: [],
  filters: {},
  page: 1,
  totalPages: 1,

  setInitialData: (data) => {
    const pageNumber = parseInt(data.page) || 1; // Конвертуємо рядок в число для store

    set({
      cars: data.cars,
      page: pageNumber, //Число для store
      totalPages: data.totalPages,
    });
  },

  loadCars: async ({ page = 1, limit = 12 } = {}) => {
    const { filters, cars } = get();

    try {
      const data = await fetchCarsClient({
        page: page.toString(), // Конвертуємо в рядок для API
        limit: limit.toString(),
        ...filters,
      });

      // Конвертуємо рядок в число для store
      const pageNumber = parseInt(data.page) || 1;

      set({
        cars: page === 1 ? data.cars : [...cars, ...data.cars],
        page: pageNumber, // Число для store
        totalPages: data.totalPages,
      });
    } catch (err) {
      console.error("Failed to load cars:", err);
    }
  },

  setFilters: (filters) => {
    set({ filters });
  },

  addToFavorites: (car) => {
    const newFav = [...get().favorites, car];
    set({ favorites: newFav });

    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(newFav));
    }
  },

  removeFromFavorites: (id) => {
    const newFav = get().favorites.filter((c) => c.id !== id);
    set({ favorites: newFav });

    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(newFav));
    }
  },

  setFavoritesFromStorage: () => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("favorites");
      set({ favorites: raw ? JSON.parse(raw) : [] });
    }
  },
}));
