// app/api/cars/[id]/route.ts
import { NextResponse } from "next/server";
import { fetchCarByIdServer } from "@/lib/api/serverApi";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const car = await fetchCarByIdServer(id);
    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error("Error in /api/cars/[id] GET:", error);
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }
}
