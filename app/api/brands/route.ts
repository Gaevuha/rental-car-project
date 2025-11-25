// app/api/brand/route.ts
import { NextResponse } from "next/server";
import { fetchBrandsServer } from "@/lib/api/serverApi";

export async function GET() {
  try {
    const brands = await fetchBrandsServer();
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    console.error("Error in /api/brand GET:", error);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}
