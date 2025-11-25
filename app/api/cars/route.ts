// app/api/cars/route.ts
import { NextResponse } from "next/server";
import { fetchCarsServer } from "@/lib/api/serverApi";
import type { FetchCarsParams } from "@/types/car";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params: FetchCarsParams = {};

    searchParams.forEach((value, key) => {
      params[key as keyof FetchCarsParams] = value;
    });

    const data = await fetchCarsServer(params);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in /api/cars GET:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
