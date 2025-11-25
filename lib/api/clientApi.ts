// lib/api/clientApi.ts
"use client";

import api from "@/lib/api/api";
import type { FetchCarsParams, CarsResponse, Car } from "@/types/car";

export const fetchCarsClient = async (
  params: FetchCarsParams = {}
): Promise<CarsResponse> => {
  const res = await api.get<CarsResponse>("/cars", { params });

  return res.data;
};

export const fetchCarByIdClient = async (id: string) => {
  const res = await api.get<Car>(`/cars/${id}`);
  return res.data;
};

export const fetchBrandsClient = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/brands");
  return res.data;
};
