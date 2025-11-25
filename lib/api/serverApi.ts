// lib/api/serverApi.ts
import { api } from "@/app/api/api";
import type { FetchCarsParams, CarsResponse, Car } from "@/types/car";

export const fetchCarsServer = async (
  params: FetchCarsParams = {}
): Promise<CarsResponse> => {
  const res = await api.get<CarsResponse>("/cars", { params });

  return res.data;
};

export const fetchCarByIdServer = async (id: string) => {
  const res = await api.get<Car>(`/cars/${id}`);
  return res.data;
};

export const fetchBrandsServer = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/brands");
  return res.data;
};
