// app/FavoritesInitializer.tsx
"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/lib/store/carsStore";

export default function FavoritesInitializer() {
  const { setFavoritesFromStorage } = useCarsStore();

  useEffect(() => {
    setFavoritesFromStorage();
  }, [setFavoritesFromStorage]);

  return null;
}
