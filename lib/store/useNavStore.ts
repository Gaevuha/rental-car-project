"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavState {
  activeItem: "home" | "catalog" | null;
  setActiveItem: (item: "home" | "catalog" | null) => void;
}

export const useNavStore = create<NavState>()(
  persist(
    (set) => ({
      activeItem: null, // спочатку нічого не активно
      setActiveItem: (item) => set({ activeItem: item }),
    }),
    {
      name: "nav-storage",
    }
  )
);
