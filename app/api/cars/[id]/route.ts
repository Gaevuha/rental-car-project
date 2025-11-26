// app/api/cars/[id]/route.ts
import { NextResponse } from "next/server";
import { fetchCarByIdServer } from "@/lib/api/serverApi";
import type { Car } from "@/types/car";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const car: Car | null = await fetchCarByIdServer(id);

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
