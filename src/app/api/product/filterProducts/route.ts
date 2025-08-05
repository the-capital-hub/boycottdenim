import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import { Product } from "@/models/Products";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const gender = searchParams.get("gender");
    const category = searchParams.get("category") || searchParams.get("fit");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (gender) filter.gender = gender;
    if (category) filter.categories = category;
    if (color) filter.color = color;
    if (size) filter.size = size;

    // console.log("FILTER:", filter);

    const products = await Product.find(filter).skip(skip).limit(limit);
    // console.log("PRODUCTS FOUND:", products.length);

    const total = await Product.countDocuments(filter);

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products", error },
      { status: 500 }
    );
  }
}
