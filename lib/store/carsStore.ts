// /lib/store/carsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Додаємо persist для автоматичного збереження
import { fetchCarsClient } from "@/lib/api/clientApi";
import { Car, CarsFilters, CarsResponse } from "@/types/car";

interface CarsState {
  cars: Car[];
  favorites: Car[];
  filters: CarsFilters;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  loadCars: (params?: { page?: number; limit?: number }) => Promise<void>;
  setFilters: (filters: CarsFilters) => void;
  setInitialData: (data: CarsResponse) => void;

  addToFavorites: (car: Car) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      favorites: [],
      filters: {},
      page: 1,
      totalPages: 1,
      isLoading: false,
      error: null,

      setInitialData: (data) => {
        const pageNumber = parseInt(data.page) || 1;
        set({
          cars: data.cars,
          page: pageNumber,
          totalPages: data.totalPages,
        });
      },

      loadCars: async ({ page = 1, limit = 12 } = {}) => {
        const { filters, cars } = get();

        set({ isLoading: true, error: null });

        try {
          const data = await fetchCarsClient({
            page: page.toString(),
            limit: limit.toString(),
            ...filters,
          });

          const pageNumber = parseInt(data.page) || 1;

          set({
            cars: page === 1 ? data.cars : [...cars, ...data.cars],
            page: pageNumber,
            totalPages: data.totalPages,
            isLoading: false,
          });
        } catch (err) {
          console.error("Failed to load cars:", err);
          set({
            error: "Не вдалося завантажити автомобілі",
            isLoading: false,
          });
        }
      },

      setFilters: (filters) => {
        set({ filters, page: 1 }); // Скидаємо сторінку при зміні фільтрів
      },

      addToFavorites: (car) => {
        const { favorites } = get();
        // Перевіряємо, чи вже є в улюблених
        if (!favorites.some((fav) => fav.id === car.id)) {
          const newFavorites = [...favorites, car];
          set({ favorites: newFavorites });
        }
      },

      removeFromFavorites: (id) => {
        const newFavorites = get().favorites.filter((car) => car.id !== id);
        set({ favorites: newFavorites });
      },

      isFavorite: (id) => {
        return get().favorites.some((car) => car.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "cars-storage",
      partialize: (state) => ({ favorites: state.favorites }), // Зберігаємо тільки улюблені
    }
  )
);
