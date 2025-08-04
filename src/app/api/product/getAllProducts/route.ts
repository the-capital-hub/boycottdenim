import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  try {
    const total = await Product.countDocuments({});
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const filteredProducts = products.map((p) => {
      const obj = p.toObject();
     
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.__v;
      return obj;
    });

    return NextResponse.json(
      {
        products: filteredProducts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
