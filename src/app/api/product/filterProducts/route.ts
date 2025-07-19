import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";


export async function GET(req: NextRequest) {


  const { searchParams } = new URL(req.url);
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");

  let filter: any = {};

  if (gender) {
    filter.gender = gender;
  }

  if (category) {
    filter.category = category;
  }

  try {
    const products = await Product.find(filter);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}
